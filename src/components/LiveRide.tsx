import { FaFlagCheckered, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LiveRideMap from "./LiveRideMap";
import * as RideService from "../service/RideService";
import type { LiveRideResponse } from "../interfaces/LiveRideResponse";
import type { Location } from "../interfaces/Location";
import WebSocketService from "../service/WebSocketService";
console.log("RideService =", RideService);

function getDistanceInMeters(

    lat1: number,
    lon1: number,

    lat2: number,
    lon2: number

) {

    const R = 6371000;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;

    const a =

        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;

}

function LiveRide() {
  const navigate = useNavigate();
  const { rideId } = useParams();

  const [ride, setRide] =
    useState<LiveRideResponse | null>(null);

  const [driverLocation, setDriverLocation] =
    useState<Location | null>(null);

  const [passengerLocation, setPassengerLocation] =
    useState<Location | null>(null);
    const [speed, setSpeed] = useState(0);
    const [distance, setDistance] = useState("--");
    const [eta, setEta] = useState("--");

  const userType = localStorage.getItem("userType");

  const isDriver = userType === "RIDER";

  const locationRef =
    useRef<GeolocationCoordinates | null>(null);
    const previousLocation =
    useRef<GeolocationCoordinates | null>(null);

  useEffect(() => {

    if (!rideId) return;

    loadRide();

  }, [rideId]);

  const loadRide = async () => {

    try {

      const response =
        await RideService.getLiveRide(Number(rideId));

      setRide(response);

    } catch (error) {

      console.error(error);

    }

  };

  /*
      Send GPS every 2 seconds
  */

  useEffect(() => {

    if (!navigator.geolocation) return;

    const watchId =
      navigator.geolocation.watchPosition(

        (position) => {

    locationRef.current = position.coords;

    if (previousLocation.current) {

        const distance =
            getDistanceInMeters(

                previousLocation.current.latitude,
                previousLocation.current.longitude,

                position.coords.latitude,
                position.coords.longitude

            );

        const speedMps = distance / 2;

        setSpeed(
            Math.round(speedMps * 3.6)
        );

    }

    previousLocation.current =
        position.coords;

    if (isDriver) {

        setDriverLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: ""
        });

    } else {

        setPassengerLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: ""
        });

    }

},

        console.error,

        {

          enableHighAccuracy: true,

          maximumAge: 0,

        }

      );

    const interval = setInterval(async () => {

      if (!locationRef.current) return;

      try {
        console.log("isDriver =", isDriver);
console.log("Sending location...");

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

    }, 10000);

    return () => {

      navigator.geolocation.clearWatch(watchId);

      clearInterval(interval);

    };

  }, [isDriver]);

  /*
      Listen for LIVE_LOCATION
  */

 useEffect(() => {

    if (!ride) return;

    WebSocketService.connect();

    WebSocketService.subscribe(
        `/topic/live/${ride.rideId}`,
        (event) => {

            console.log(
  "Live Event:",
  JSON.stringify(event, null, 2)
);

            if (event.type === "LIVE_LOCATION") {

                setDriverLocation(event.payload.driverLocation);

                setPassengerLocation(event.payload.passengerLocation);

            }
            if (event.type === "RIDE_COMPLETED") {
              navigate(`/my-rides`);

}

        }
    );

    return () => {

        WebSocketService.disconnect();

    };

}, [ride]);

useEffect(() => {

  if (!driverLocation) return;

  if (!window.google) return;

  const meters =
    window.google.maps.geometry.spherical.computeDistanceBetween(

      new window.google.maps.LatLng(
        driverLocation.latitude,
        driverLocation.longitude
      ),

      new window.google.maps.LatLng(
        ride!.destination.latitude,
        ride!.destination.longitude
      )

    );

  if (meters >= 1000) {

    setDistance(
      `${(meters / 1000).toFixed(1)} km`
    );

  } else {

    setDistance(
      `${Math.round(meters)} m`
    );

  }

}, [driverLocation, ride]);

useEffect(() => {

  if (!driverLocation || !ride) return;

  if (!window.google) return;

  const directionsService =
    new window.google.maps.DirectionsService();

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

      travelMode:
        window.google.maps.TravelMode.DRIVING,
    },

    (result, status) => {

      if (
        status ===
          window.google.maps.DirectionsStatus.OK &&
        result
      ) {

        const leg = result.routes[0].legs[0];

        setEta(
          leg.duration?.text ?? "--"
        );

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

      <div className="h-screen flex justify-center items-center text-2xl font-semibold">

        Loading Ride...

      </div>

    );

  }

  return (

    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Header */}

      <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">

            Live Ride

          </h1>

          <p className="text-gray-500 mt-1">

            Ride #{ride.rideId}

          </p>

        </div>

        <span className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

          {ride.rideStatus}

        </span>

      </div>

      {/* Map */}

      <div className="flex-1 relative">

        <LiveRideMap

          riderPolyline={ride.riderEncodedPolyline}

          passengerPolyline={ride.passengerEncodedPolyline}

          pickup={ride.source}

          destination={ride.destination}

          driverLocation={driverLocation}

          passengerLocation={passengerLocation}

        />

        {/* Bottom Card */}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl">

          <div className="bg-white rounded-3xl shadow-2xl p-6">

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Person */}

              <div>

                <p className="text-gray-500 text-sm">

                  {isDriver ? "Passenger" : "Driver"}

                </p>

                <h2 className="text-2xl font-bold mt-2">

                  {isDriver
                    ? ride.passengerName
                    : ride.driverName}

                </h2>

                <p className="text-gray-500 mt-1">

                  {isDriver
                    ? ride.passengerPhoneNumber
                    : ride.driverPhoneNumber}

                </p>

                <button className="mt-5 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">

                  <FaPhoneAlt />

                  Call

                </button>

              </div>

              {/* Stats */}

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-gray-100 rounded-xl p-4 text-center">

                  <p className="text-sm text-gray-500">

                    ETA

                  </p>

                  <h3 className="text-xl font-bold">

                    {eta}

                  </h3>

                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">

                  <p className="text-sm text-gray-500">

                    Distance

                  </p>

                  <h3 className="text-xl font-bold">

                    {distance}

                  </h3>

                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">

                  <p className="text-sm text-gray-500">

                    Speed

                  </p>

                  <h3 className="text-xl font-bold">

                    {speed} km/h

                  </h3>

                </div>

              </div>

              {/* Actions */}

              <div className="flex items-center justify-end">

                {isDriver ? (

                  <button className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold" onClick={completeRide}>

                    <FaFlagCheckered />

                    Complete Ride

                  </button>

                ) : (

                  <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold">

                    Cancel Ride

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