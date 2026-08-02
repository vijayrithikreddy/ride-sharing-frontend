import { Autocomplete } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import "../styles/google.css";
import type { Location } from "../interfaces/Location.ts";
import { publishRide } from "../service/RideService.ts";
import type { CreateRideRequest } from "../interfaces/CreateRideRequest.ts";




interface PublishRideCardProps {
  setStep: React.Dispatch<
    React.SetStateAction<"welcome" | "publish">
  >;

  pickup: Location | null;
  destination: Location | null;

  setPickup: React.Dispatch<
    React.SetStateAction<Location | null>
  >;

  setDestination: React.Dispatch<
    React.SetStateAction<Location | null>
  >;

  selecting: "pickup" | "destination" | null;

  setSelecting: React.Dispatch<
    React.SetStateAction<"pickup" | "destination" | null>
  >;
  encodedPolyline : string
}
function PublishRideCard({
  setStep,
  pickup,
  destination,
  setPickup,
  setDestination,
  selecting,
  setSelecting,
  encodedPolyline
}: PublishRideCardProps) {
 
  const [hour, setHour] = useState("10");
const [minute, setMinute] = useState("30");
const [period, setPeriod] = useState("AM");

const [showTimePicker, setShowTimePicker] = useState(false);
  const [price, setPrice] = useState("");

  const pickupAutocomplete =
  useRef<google.maps.places.Autocomplete | null>(null);

const destinationAutocomplete =
  useRef<google.maps.places.Autocomplete | null>(null);
  const [pickupInput, setPickupInput] = useState(
  pickup?.address ?? ""
);

const [destinationInput, setDestinationInput] = useState(
  destination?.address ?? ""
);
useEffect(() => {
  setPickupInput(pickup?.address ?? "");
}, [pickup]);

useEffect(() => {
  setDestinationInput(destination?.address ?? "");
}, [destination]);

  const handlePublishRide = () => {

  if (!pickup) {
    alert("Please select the pickup location.");
    return;
  }

  if (!destination) {
    alert("Please select the destination.");
    return;
  }

  if (!price) {
    alert("Please enter the price.");
    return;
  }

  if (!hour || !minute) {
    alert("Please enter the ride time.");
    return;
  }

  // Convert 12-hour format to 24-hour format
  let hour24 = Number(hour);

  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  }

  if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  const now = new Date();

  const departureTime =`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(hour24).padStart(2, "0")}:${String(Number(minute)).padStart(2, "0")}:00`;

  const request: CreateRideRequest = {
    source: {
      latitude: pickup.latitude,
      longitude: pickup.longitude,
      address: pickup.address,
    },

    destination: {
      latitude: destination.latitude,
      longitude: destination.longitude,
      address: destination.address,
    },

    encodedPolyline,

    departureTime,

    price: Number(price),
  };

  console.log("Publish Ride Request");
  console.log(request);
  publishRide(request);

  // Example:
  // await RideService.publishRide(request);

};

  return (
    <div className="absolute top-10 left-10 w-[430px]">
      <div className="bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}

        <div className="flex items-center gap-3">

          <button
            onClick={() => setStep("welcome")}
            className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h2 className="text-2xl font-bold">
              Publish Ride
            </h2>

            <p className="text-gray-500 text-sm">
              Fill the ride details below.
            </p>
          </div>

        </div>

        {/* Pickup */}

        <div className="mt-4">

          <label className="font-semibold text-gray-700">
            Starting Address
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4">

            <FaLocationArrow className="text-blue-600" />

           <Autocomplete
  onLoad={(autocomplete) => {
    pickupAutocomplete.current = autocomplete;
  }}
  onPlaceChanged={() => {
    const place = pickupAutocomplete.current?.getPlace();

    if (!place?.geometry?.location) return;

    setPickup({
      address: place.formatted_address ?? "",
      latitude : place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    });
    setPickupInput(
    place.formatted_address ?? ""
);
  }}
>
  <input
    type="text"
    placeholder="Enter pickup location"
    value={pickupInput}
    onChange={(e) =>
  setPickupInput(e.target.value)
}
    className="w-full p-3 outline-none"
  />
</Autocomplete>
          </div>
          <button
    type="button"
    disabled={selecting === "pickup"}
    onClick={() => setSelecting("pickup")}
    className={`mt-2 text-sm font-medium ${
        selecting === "pickup"
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-700"
    }`}
>
    {selecting === "pickup"
        ? "📍 Click on map..."
        : "📍 Select from Map"}
</button>
        </div>

        {/* Destination */}

        <div className="mt-4">

          <label className="font-semibold text-gray-700">
            Destination
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4">

            <FaMapMarkerAlt className="text-red-500" />

            <Autocomplete
  onLoad={(autocomplete) => {
    destinationAutocomplete.current = autocomplete;
  }}
  onPlaceChanged={() => {
    const place = destinationAutocomplete.current?.getPlace();

    if (!place?.geometry?.location) return;

    setDestination({
      address: place.formatted_address ?? "",
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    });
   setDestinationInput(
    place.formatted_address ?? ""
);
  }}
>
  <input
    type="text"
    placeholder="Enter destination"
    value={destinationInput}
    onChange={(e) =>
    setDestinationInput(e.target.value)
}
    className="w-full p-3 outline-none"
  />
</Autocomplete>

          </div>
          <button
    type="button"
    disabled={selecting === "destination"}
    onClick={() => setSelecting("destination")}
    className={`mt-2 text-sm font-medium ${
        selecting === "destination"
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-700"
    }`}
>
    {selecting === "destination"
        ? "📍 Click on map..."
        : "📍 Select from Map"}
</button>

        </div>
<div className="flex gap-3">
{/* Ride Time */}
<div className="mt-4 flex-1">

  <label className="font-semibold text-gray-700 text-sm">
    Ride Start Time
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-3 py-2 h-12">

    <FaClock className="text-gray-500 mr-2 text-sm" />

    <div className="flex items-center gap-1 w-full">

      {/* Hour */}
      <input
        type="number"
        min={1}
        max={12}
        value={hour}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setHour("");
            return;
          }

          const num = Number(value);
          if (num >= 1 && num <= 12) {
            setHour(value);
          }
        }}
        className="w-10 h-6  text-sm text-center border rounded-md outline-none focus:border-blue-500"
      />

      <span className="font-semibold text-sm">:</span>

      {/* Minute */}
      <input
        type="number"
        min={0}
        max={59}
        value={minute}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setMinute("");
            return;
          }

          const num = Number(value);
          if (num >= 0 && num <= 59) {
            setMinute(value);
          }
        }}
        className="w-10 h-6 px text-sm text-center border rounded-md outline-none focus:border-blue-500"
      />

      {/* AM */}
      <div></div>
      <button
        type="button"
        onClick={() => setPeriod("AM")}
        className={`px-2 py-1  text-xs rounded-md transition ${
          period === "AM"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        AM
      </button>

      {/* PM */}
      <button
        type="button"
        onClick={() => setPeriod("PM")}
        className={`px-2 py-1 text-xs rounded-md transition ${
          period === "PM"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        PM
      </button>

    </div>

  </div>

</div>
        {/* Price */}

        <div className="mt-4">

          <label className="font-semibold text-gray-700">
            Price per Seat
          </label>

          <div className="mt-2 flex items-center border rounded-xl px-4 h-12">

            <FaRupeeSign className="text-green-600" />

            <input
              type="number"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 outline-none"
            />

          </div>

        </div>
        </div>

      

        {/* Publish Button */}

        <button
          onClick={handlePublishRide}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Publish Ride
        </button>

      </div>
      </div>
  );
}

export default PublishRideCard;