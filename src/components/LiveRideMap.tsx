import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
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
}

function LiveRideMap({
  riderPolyline,
  passengerPolyline,
  pickup,
  destination,
}: LiveRideMapProps) {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const [riderPath, setRiderPath] =
    useState<google.maps.LatLng[]>([]);

  const [passengerPath, setPassengerPath] =
    useState<google.maps.LatLng[]>([]);

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
    setPassengerPath(passenger);

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
      center={{
        lat: pickup.latitude,
        lng: pickup.longitude,
      }}
      zoom={13}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
      }}
    >

      <Polyline
        path={riderPath}
        options={{
          strokeColor: "#2563EB",
          strokeWeight: 7,
        }}
      />

      <Polyline
        path={passengerPath}
        options={{
          strokeColor: "#10B981",
          strokeWeight: 6,
        }}
      />

      <Marker
        position={{
          lat: pickup.latitude,
          lng: pickup.longitude,
        }}
        label="P"
      />

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