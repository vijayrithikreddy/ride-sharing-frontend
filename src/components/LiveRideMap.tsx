import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Location } from "../interfaces/Location";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries: ("places" | "geometry")[] = [
  "places",
  "geometry",
];

interface LiveRideMapProps {
  riderPolyline: string;
  passengerPolyline: string;

  pickup: Location;
  destination: Location;

  driverLocation: Location | null;
  passengerLocation: Location | null;
}

function LiveRideMap({
  riderPolyline,
  passengerPolyline,
  pickup,
  destination,
  driverLocation,
  passengerLocation,
}: LiveRideMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // Custom Memoized Markers
  const driverIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#2563EB" fill-opacity="0.25"/>
            <circle cx="22" cy="22" r="14" fill="#2563EB" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="22" cy="22" r="5" fill="#FFFFFF"/>
          </svg>
        `),
      scaledSize: new window.google.maps.Size(44, 44),
      anchor: new window.google.maps.Point(22, 22),
    };
  }, [isLoaded]);

  const passengerIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#10B981" fill-opacity="0.25"/>
            <circle cx="22" cy="22" r="14" fill="#10B981" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="22" cy="22" r="5" fill="#FFFFFF"/>
          </svg>
        `),
      scaledSize: new window.google.maps.Size(44, 44),
      anchor: new window.google.maps.Point(22, 22),
    };
  }, [isLoaded]);

  const pickupIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
            <path d="M18 0 C8 0 0 8 0 18 C0 29 18 44 18 44 C18 44 36 29 36 18 C36 8 28 0 18 0 Z" fill="#10B981"/>
            <circle cx="18" cy="16" r="8" fill="#FFFFFF"/>
            <text x="18" y="20" font-family="sans-serif" font-size="9" font-weight="bold" fill="#10B981" text-anchor="middle">P</text>
          </svg>
        `),
      scaledSize: new window.google.maps.Size(32, 40),
      anchor: new window.google.maps.Point(16, 40),
    };
  }, [isLoaded]);

  const destinationIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
            <path d="M18 0 C8 0 0 8 0 18 C0 29 18 44 18 44 C18 44 36 29 36 18 C36 8 28 0 18 0 Z" fill="#EF4444"/>
            <circle cx="18" cy="16" r="8" fill="#FFFFFF"/>
            <text x="18" y="20" font-family="sans-serif" font-size="9" font-weight="bold" fill="#EF4444" text-anchor="middle">D</text>
          </svg>
        `),
      scaledSize: new window.google.maps.Size(32, 40),
      anchor: new window.google.maps.Point(16, 40),
    };
  }, [isLoaded]);

  const [riderPath, setRiderPath] = useState<google.maps.LatLng[]>([]);
  const [passengerPath, setPassengerPath] = useState<google.maps.LatLng[]>([]);
  const [remainingPath, setRemainingPath] = useState<google.maps.LatLng[]>([]);
  const [remainingPassengerPath, setRemainingPassengerPath] = useState<google.maps.LatLng[]>([]);

  const [animatedDriver, setAnimatedDriver] = useState<Location | null>(null);
  const [animatedPassenger, setAnimatedPassenger] = useState<Location | null>(null);

  const driverCurrentIndex = useRef(0);
  const passengerCurrentIndex = useRef(0);
  const [followTarget, setFollowTarget] = useState(true);

  const targetLocation = useMemo(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "RIDER") {
      return animatedPassenger;
    }
    return animatedDriver;
  }, [animatedDriver, animatedPassenger]);

  useEffect(() => {
    if (!isLoaded || !window.google || !window.google.maps.geometry) {
      return;
    }

    const rider = window.google.maps.geometry.encoding.decodePath(riderPolyline);
    const passenger = window.google.maps.geometry.encoding.decodePath(passengerPolyline);

    setRiderPath(rider);
    setRemainingPath(rider);
    setPassengerPath(passenger);
    setRemainingPassengerPath(passenger);

    const bounds = new window.google.maps.LatLngBounds();
    rider.forEach((point) => bounds.extend(point));
    passenger.forEach((point) => bounds.extend(point));

    mapRef.current?.fitBounds(bounds);
  }, [isLoaded, riderPolyline, passengerPolyline]);

  useEffect(() => {
    if (!driverLocation) return;
    if (!animatedDriver) {
      setAnimatedDriver(driverLocation);
      return;
    }

    const duration = 1500;
    const fps = 60;
    const totalFrames = duration / (1000 / fps);
    let frame = 0;

    const startLat = animatedDriver.latitude;
    const startLng = animatedDriver.longitude;
    const endLat = driverLocation.latitude;
    const endLng = driverLocation.longitude;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setAnimatedDriver({
        latitude: startLat + (endLat - startLat) * progress,
        longitude: startLng + (endLng - startLng) * progress,
        address: "",
      });

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [driverLocation]);

  useEffect(() => {
    if (!passengerLocation) return;
    if (!animatedPassenger) {
      setAnimatedPassenger(passengerLocation);
      return;
    }

    const duration = 1500;
    const fps = 60;
    const totalFrames = duration / (1000 / fps);
    let frame = 0;

    const startLat = animatedPassenger.latitude;
    const startLng = animatedPassenger.longitude;
    const endLat = passengerLocation.latitude;
    const endLng = passengerLocation.longitude;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setAnimatedPassenger({
        latitude: startLat + (endLat - startLat) * progress,
        longitude: startLng + (endLng - startLng) * progress,
        address: "",
      });

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [passengerLocation]);

  useEffect(() => {
    if (!followTarget || !targetLocation || !mapRef.current) return;
    mapRef.current.panTo({
      lat: targetLocation.latitude,
      lng: targetLocation.longitude,
    });
  }, [targetLocation, followTarget]);

  useEffect(() => {
    if (followTarget) return;
    const timer = setTimeout(() => {
      setFollowTarget(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [followTarget]);

  if (!isLoaded) {
    return (
      <div className="h-full flex justify-center items-center text-gray-500 font-semibold text-sm bg-slate-50">
        Loading Map Engine...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={14}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      onDragStart={() => {
        setFollowTarget(false);
      }}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        gestureHandling: "greedy",
      }}
    >
      {/* Driver Marker */}
      {animatedDriver && (
        <Marker
          position={{
            lat: animatedDriver.latitude,
            lng: animatedDriver.longitude,
          }}
          icon={driverIcon}
          title="Rider Position"
        />
      )}

      {/* Passenger Marker */}
      {animatedPassenger && (
        <Marker
          position={{
            lat: animatedPassenger.latitude,
            lng: animatedPassenger.longitude,
          }}
          icon={passengerIcon}
          title="Passenger Position"
        />
      )}

      {/* Rider Route Polyline */}
      <Polyline
        path={remainingPath}
        options={{
          strokeColor: "#2563EB",
          strokeWeight: 6,
          strokeOpacity: 0.9,
        }}
      />

      {/* Passenger Route Polyline */}
      <Polyline
        path={remainingPassengerPath}
        options={{
          strokeColor: "#10B981",
          strokeWeight: 5,
          strokeOpacity: 0.9,
        }}
      />

      {/* Pickup Marker */}
      {pickup && (
        <Marker
          position={{
            lat: pickup.latitude,
            lng: pickup.longitude,
          }}
          icon={pickupIcon}
          title={`Pickup: ${pickup.address}`}
        />
      )}

      {/* Destination Marker */}
      {destination && (
        <Marker
          position={{
            lat: destination.latitude,
            lng: destination.longitude,
          }}
          icon={destinationIcon}
          title={`Destination: ${destination.address}`}
        />
      )}
    </GoogleMap>
  );
}

export default LiveRideMap;