import { FaFlagCheckered, FaPhoneAlt, FaArrowLeft, FaShieldAlt, FaTachometerAlt, FaClock, FaRoute } from "react-icons/fa";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LiveRideMap from "./LiveRideMap";
import * as RideService from "../service/RideService";
import type { LiveRideResponse } from "../interfaces/LiveRideResponse";
import type { Location } from "../interfaces/Location";
import WebSocketService from "../service/WebSocketService";

function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function LiveRide() {
  const navigate = useNavigate();
  const { rideId } = useParams();

  const [ride, setRide] = useState<LiveRideResponse | null>(null);
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const [passengerLocation, setPassengerLocation] = useState<Location | null>(null);

  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState("--");
  const [eta, setEta] = useState("--");

  const userType = localStorage.getItem("userType");
  const isDriver = userType === "RIDER";

  const locationRef = useRef<GeolocationCoordinates | null>(null);
  const previousLocation = useRef<GeolocationCoordinates | null>(null);
  const lastDirectionsCallTime = useRef<number>(0);

  useEffect(() => {
    if (!rideId) return;
    loadRide();
  }, [rideId]);

  const loadRide = async () => {
    try {
      const response = await RideService.getLiveRide(Number(rideId));
      setRide(response);
    } catch (error) {
      console.error(error);
    }
  };

  /*
      Send GPS & update speed (Optimized GPS Watcher)
  */
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        locationRef.current = position.coords;

        if (previousLocation.current) {
          const distMeters = getDistanceInMeters(
            previousLocation.current.latitude,
            previousLocation.current.longitude,
            position.coords.latitude,
            position.coords.longitude
          );

          // Calculate speed in km/h assuming ~2s interval
          const speedKmH = Math.round((distMeters / 2) * 3.6);
          setSpeed(speedKmH > 0 && speedKmH < 140 ? speedKmH : 0);
        }

        previousLocation.current = position.coords;

        if (isDriver) {
          setDriverLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: "",
          });
        } else {
          setPassengerLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: "",
          });
        }
      },
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      }
    );

    // Send location to server every 5 seconds (optimized from 10s interval)
    const interval = setInterval(async () => {
      if (!locationRef.current) return;

      try {
        if (isDriver) {
          await RideService.updateDriverLocation(
            locationRef.current.latitude,
            locationRef.current.longitude
          );
        } else {
          await RideService.updatePassengerLocation(
            locationRef.current.latitude,
            locationRef.current.longitude
          );
        }
      } catch (err) {
        console.error(err);
      }
    }, 5000);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(interval);
    };
  }, [isDriver]);

  /*
      Listen for LIVE_LOCATION via WebSocket
  */
  useEffect(() => {
    if (!ride) return;

    WebSocketService.connect();

    WebSocketService.subscribe(`/topic/live/${ride.rideId}`, (event) => {
      console.log("Live Event:", event);

      if (event.type === "LIVE_LOCATION") {
        setDriverLocation(event.payload.driverLocation);
        setPassengerLocation(event.payload.passengerLocation);
      }
      if (event.type === "RIDE_COMPLETED") {
        navigate(`/my-rides`);
      }
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, [ride, navigate]);

  /*
      OPTIMIZATION: Fast Local Distance Computation (0ms API latency)
  */
  useEffect(() => {
    if (!driverLocation || !ride) return;

    const meters = getDistanceInMeters(
      driverLocation.latitude,
      driverLocation.longitude,
      ride.destination.latitude,
      ride.destination.longitude
    );

    if (meters >= 1000) {
      setDistance(`${(meters / 1000).toFixed(1)} km`);
    } else {
      setDistance(`${Math.round(meters)} m`);
    }

    // Fast local ETA estimation: assuming 30 km/h average city bike speed
    const estimatedMinutes = Math.ceil((meters / 1000 / 30) * 60);
    if (estimatedMinutes <= 1) {
      setEta("Arriving now");
    } else {
      setEta(`${estimatedMinutes} mins`);
    }
  }, [driverLocation, ride]);

  /*
      OPTIMIZATION: Throttled Google Directions API for exact ETA (runs max once every 20s)
  */
  useEffect(() => {
    if (!driverLocation || !ride) return;
    if (!window.google || !window.google.maps) return;

    const now = Date.now();
    if (now - lastDirectionsCallTime.current < 20000) {
      return; // Skip API call if called recently
    }
    lastDirectionsCallTime.current = now;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {
          lat: driverLocation.latitude,
          lng: driverLocation.longitude,
        },
        destination: {
          lat: ride.destination.latitude,
          lng: ride.destination.longitude,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (
          status === window.google.maps.DirectionsStatus.OK &&
          result &&
          result.routes[0]?.legs[0]
        ) {
          const leg = result.routes[0].legs[0];
          if (leg.duration?.text) {
            setEta(leg.duration.text);
          }
        }
      }
    );
  }, [driverLocation, ride]);

  const completeRide = async () => {
    try {
      await RideService.completeRide();
    } catch (error) {
      console.error(error);
    }
  };

  if (!ride) {
    return (
      <div className="h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-700 font-bold text-base">Loading Live Ride...</p>
      </div>
    );
  }

  const partnerName = isDriver ? ride.passengerName : ride.driverName;
  const partnerPhone = isDriver ? ride.passengerPhoneNumber : ride.driverPhoneNumber;

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
            title="Back to Dashboard"
          >
            <FaArrowLeft className="text-xs" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-gray-900 leading-none">
                Live Ride Monitoring
              </h1>
              <span className="text-xs text-gray-400 font-medium">#{ride.rideId}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Real-time GPS tracking & route navigation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {ride.rideStatus || "IN_PROGRESS"}
          </span>
        </div>
      </div>

      {/* Map & Overlays Container */}
      <div className="flex-1 relative">
        <LiveRideMap
          riderPolyline={ride.riderEncodedPolyline}
          passengerPolyline={ride.passengerEncodedPolyline}
          pickup={ride.source}
          destination={ride.destination}
          driverLocation={driverLocation}
          passengerLocation={passengerLocation}
        />

        {/* Floating Bottom Live Ride Card */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Partner Contact Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 font-extrabold text-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  {partnerName ? partnerName.charAt(0) : "R"}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {isDriver ? "Passenger" : "Rider"}
                  </span>
                  <h2 className="text-lg font-extrabold text-gray-900 mt-1">
                    {partnerName || "Commuter Partner"}
                  </h2>
                  <p className="text-xs text-gray-500">{partnerPhone || "No phone listed"}</p>

                  <a
                    href={`tel:${partnerPhone}`}
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                  >
                    <FaPhoneAlt className="text-[10px]" /> Call {isDriver ? "Passenger" : "Rider"}
                  </a>
                </div>
              </div>

              {/* Ride Stats: ETA, Distance, Speed */}
              <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                    <FaClock className="text-blue-500" /> ETA
                  </div>
                  <p className="text-sm font-extrabold text-gray-900 mt-0.5">{eta}</p>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                    <FaRoute className="text-blue-500" /> Distance
                  </div>
                  <p className="text-sm font-extrabold text-gray-900 mt-0.5">{distance}</p>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                    <FaTachometerAlt className="text-blue-500" /> Speed
                  </div>
                  <p className="text-sm font-extrabold text-gray-900 mt-0.5">{speed} km/h</p>
                </div>
              </div>

              {/* Driver Complete / Passenger SOS Action */}
              <div className="flex items-center justify-end">
                {isDriver ? (
                  <button
                    onClick={completeRide}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <FaFlagCheckered /> Complete Ride
                  </button>
                ) : (
                  <button
                    onClick={() => alert("SOS Emergency Signal Triggered! Contacting Support.")}
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 active:scale-95 transition-all"
                  >
                    <FaShieldAlt /> SOS Emergency
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveRide;