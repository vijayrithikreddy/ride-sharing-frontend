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
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const driverIcon = useMemo(() => {

  if (!isLoaded || !window.google) return undefined;

  return {
    url: "/icons/bikeicon.png",
    scaledSize: new window.google.maps.Size(45, 45),
    anchor: new window.google.maps.Point(22, 22),
  };

}, [isLoaded]);

const passengerIcon = useMemo(() => {

  if (!isLoaded || !window.google) return undefined;

  return {
    url: "/icons/passenger.png",
    scaledSize: new window.google.maps.Size(40, 40),
    anchor: new window.google.maps.Point(20, 20),
  };

}, [isLoaded]);



  const [riderPath, setRiderPath] =
    useState<google.maps.LatLng[]>([]);

  const [passengerPath, setPassengerPath] =
    useState<google.maps.LatLng[]>([]);

    const [remainingPath, setRemainingPath] =
  useState<google.maps.LatLng[]>([]);

  const [remainingPassengerPath, setRemainingPassengerPath] =
    useState<google.maps.LatLng[]>([]);
    const [animatedDriver, setAnimatedDriver] =
  useState<Location | null>(null);

const [animatedPassenger, setAnimatedPassenger] =
  useState<Location | null>(null);
const driverCurrentIndex = useRef(0);

const passengerCurrentIndex = useRef(0);
const [followTarget, setFollowTarget] =
  useState(true);
const targetLocation = useMemo(() => {

    const userType = localStorage.getItem("userType");

    if (userType === "RIDER") {

        return animatedPassenger;

    }

    return animatedDriver;

}, [animatedDriver, animatedPassenger]);

  useEffect(() => {

    if (
      !isLoaded ||
      !window.google ||
      !window.google.maps.geometry
    ) {
      return;
    }

    const rider =
      window.google.maps.geometry.encoding.decodePath(
        riderPolyline
      );

    const passenger =
      window.google.maps.geometry.encoding.decodePath(
        passengerPolyline
      );

    setRiderPath(rider);
    setRemainingPath(rider);
    setPassengerPath(passenger);
    setRemainingPassengerPath(passenger);


    const bounds =
      new window.google.maps.LatLngBounds();

    rider.forEach((point) =>
      bounds.extend(point)
    );

    passenger.forEach((point) =>
      bounds.extend(point)
    );

    mapRef.current?.fitBounds(bounds);

  }, [
    isLoaded,
    riderPolyline,
    passengerPolyline,
  ]);
  useEffect(() => {

  if (!driverLocation) return;

  if (!animatedDriver) {

    setAnimatedDriver(driverLocation);

    return;

  }

  const duration = 2000;
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

      latitude:
        startLat + (endLat - startLat) * progress,

      longitude:
        startLng + (endLng - startLng) * progress,

      address: ""

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

  const duration = 2000;
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

      latitude:
        startLat + (endLat - startLat) * progress,

      longitude:
        startLng + (endLng - startLng) * progress,

      address: ""

    });

    if (frame >= totalFrames) {

      clearInterval(interval);

    }

  }, 1000 / fps);

  return () => clearInterval(interval);

}, [passengerLocation]);
useEffect(() => {

  if (!followTarget) return;

  if (!targetLocation) return;

  if (!mapRef.current) return;

  mapRef.current.panTo({
    lat: targetLocation.latitude,
    lng: targetLocation.longitude,
  });

}, [targetLocation, followTarget]);

useEffect(() => {

  if (followTarget) return;

  const timer = setTimeout(() => {
    setFollowTarget(true);
  }, 5000);

  return () => clearTimeout(timer);

}, [followTarget]);
useEffect(() => {

    if (!driverLocation) return;

    if (remainingPath.length === 0) return;

    let closestIndex = driverCurrentIndex.current;

    let minDistance = Number.MAX_VALUE;

    for (

        let i = driverCurrentIndex.current;

        i < remainingPath.length;

        i++

    ) {

        const point = remainingPath[i];

        const distance =
            window.google.maps.geometry.spherical.computeDistanceBetween(

                point,

                new window.google.maps.LatLng(
                    driverLocation.latitude,
                    driverLocation.longitude
                )

            );

        if (distance < minDistance) {

            minDistance = distance;

            closestIndex = i;

        }

    }

    if (closestIndex > driverCurrentIndex.current) {

        const consumed =
            closestIndex - driverCurrentIndex.current;

        driverCurrentIndex.current = closestIndex;

        setRemainingPath(prev =>
            prev.slice(consumed)
        );

    }

}, [driverLocation]);

useEffect(() => {

    if (!passengerLocation) return;

    if (remainingPassengerPath.length === 0) return;

    let closestIndex = passengerCurrentIndex.current;

    let minDistance = Number.MAX_VALUE;

    for (

        let i = passengerCurrentIndex.current;

        i < remainingPassengerPath.length;

        i++

    ) {

        const point = remainingPassengerPath[i];

        const distance =
            window.google.maps.geometry.spherical.computeDistanceBetween(

                point,

                new window.google.maps.LatLng(
                    passengerLocation.latitude,
                    passengerLocation.longitude
                )

            );

        if (distance < minDistance) {

            minDistance = distance;
            closestIndex = i;

        }

    }

    if (closestIndex > passengerCurrentIndex.current) {

        const consumed =
            closestIndex - passengerCurrentIndex.current;

        passengerCurrentIndex.current = closestIndex;

        setRemainingPassengerPath(prev =>
            prev.slice(consumed)
        );

    }

}, [passengerLocation]);

  if (!isLoaded) {
    return (
      <div className="h-full flex justify-center items-center">
        Loading Map...
      </div>
    );
  }
  

  return (
    <GoogleMap
  mapContainerStyle={containerStyle}
  zoom={13}
  onLoad={(map) => {
    mapRef.current = map;
  }}
  onDragStart={() => {
    setFollowTarget(false);
  }}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
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
    title="Driver"
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
    title="Passenger"
/>
)}

      {/* Rider Route */}

      <Polyline
        path={remainingPath}
        options={{
          strokeColor: "#2563EB",
          strokeWeight: 7,
        }}
      />

      {/* Passenger Route */}

      <Polyline
        path={remainingPassengerPath}
        options={{
          strokeColor: "#10B981",
          strokeWeight: 6,
        }}
      />

      {/* Pickup */}

      <Marker
        position={{
          lat: pickup.latitude,
          lng: pickup.longitude,
        }}
        label="P"
      />

      {/* Destination */}

      <Marker
        position={{
          lat: destination.latitude,
          lng: destination.longitude,
        }}
        label="D"
      />

    </GoogleMap>
  );
}

export default LiveRideMap;