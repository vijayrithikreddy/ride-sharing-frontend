import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { Location } from "../interfaces/Location";

import { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};



const libraries: ("places" | "geometry")[] = [
  "places",
  "geometry",
];
interface GoogleMapViewProps {
  pickup: Location | null;
  destination: Location | null;

  setPickup: React.Dispatch<React.SetStateAction<Location | null>>;
  setDestination: React.Dispatch<React.SetStateAction<Location | null>>;

  selecting: "pickup" | "destination" | null;
   setSelecting: React.Dispatch<
      React.SetStateAction<"pickup" | "destination" | null>
    >;
    setEncodedPolyline: React.Dispatch<React.SetStateAction<string | null>>;
}

function GoogleMapView({
  pickup,
  destination,
  setPickup,
  setDestination,
  selecting,
  setSelecting,
  setEncodedPolyline,
}: GoogleMapViewProps) {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const Defaultcenter = {
  lat: 17.385,
  lng: 78.4867,
};
const [center,setCenter] = useState(Defaultcenter);

  const mapRef = useRef<google.maps.Map | null>(null);

  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // ===========================
  // Draw Route
  // ===========================

  useEffect(() => {

    if (!pickup || !destination) {
      setDirections(null);
      return;
    }

    const directionsService =
      new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {
          lat: pickup.latitude,
          lng: pickup.longitude,
        },
        destination: {
          lat: destination.latitude,
          lng: destination.longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {

        if (status === "OK" && result) {
    setDirections(result);
    setEncodedPolyline(result.routes[0].overview_polyline);
}

      }
    );

  }, [pickup, destination]);
  useEffect(() => {

  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setCenter(currentLocation);

      if (mapRef.current) {
        mapRef.current.panTo(currentLocation);
        mapRef.current.setZoom(16);
      }

    },

    (error) => {
      console.error(error);
    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
    }

  );

}, []);

  // ===========================
  // Auto Fit Map
  // ===========================

  useEffect(() => {

    if (!mapRef.current) return;

    if (pickup && destination) {

      const bounds =
        new google.maps.LatLngBounds();

      bounds.extend({
        lat: pickup.latitude,
        lng: pickup.longitude,
      });

      bounds.extend({
        lat: destination.latitude,
        lng: destination.longitude,
      });

      mapRef.current.fitBounds(bounds);

    } else if (pickup) {

      mapRef.current.panTo({
        lat: pickup.latitude,
        lng: pickup.longitude,
      });

      mapRef.current.setZoom(16);

    } else if (destination) {

      mapRef.current.panTo({
        lat: destination.latitude,
        lng: destination.longitude,
      });

      mapRef.current.setZoom(16);

    }

  }, [pickup, destination]);
  useEffect(() => {

    if (!mapRef.current) return;

    mapRef.current.setOptions({
        draggableCursor: selecting ? "crosshair" : undefined,
    });

}, [selecting]);

  // ===========================
  // Handle Map Click
  // ===========================

  const handleMapClick = (
    e: google.maps.MapMouseEvent
  ) => {

    if (
      !e.latLng ||
      !geocoder.current ||
      !selecting
    ) {
      return;
    }

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    geocoder.current.geocode(
      {
        location: {
          lat,
          lng,
        },
      },
      (results, status) => {

        if (
          status !== "OK" ||
          !results ||
          results.length === 0
        ) {
          return;
        }

        const location: Location = {
          address: results[0].formatted_address,
          latitude : lat,
          longitude : lng,
        };

        if (selecting === "pickup") {

          setPickup(location);

        } else {

          setDestination(location);

        }
        setSelecting(null);

      }
    );

  };

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={(map) => {
        mapRef.current = map;
        geocoder.current =
          new google.maps.Geocoder();
      }}
      onClick={handleMapClick}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        gestureHandling: "greedy",

        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      <Marker
  position={center}
  icon={{
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: "#4285F4",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 3,
  }}
/>

      {pickup && (
        <Marker
          position={{
            lat: pickup.latitude,
            lng: pickup.longitude,
          }}
          label="P"
        />
      )}

      {destination && (
        <Marker
          position={{
            lat: destination.latitude,
            lng: destination.longitude,
          }}
          label="D"
        />
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#2563EB",
              strokeWeight: 6,
              strokeOpacity: 0.9,
            },
          }}
        />
      )}

    </GoogleMap>
  );
}

export default GoogleMapView;