import { Autocomplete } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaClock,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import "../styles/google.css";
import type { Location } from "../interfaces/Location";
import { searchRides } from "../service/RideService";
import type { SearchRideRequest } from "../interfaces/SearchRideRequest";
import { useNavigate } from "react-router-dom";

interface SearchRideCardProps {
  setStep: React.Dispatch<
    React.SetStateAction<"welcome" | "search">
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

  passengerEncodedPolyline: string;
}

function SearchRideCard({
  setStep,
  pickup,
  destination,
  setPickup,
  setDestination,
  selecting,
  setSelecting,
  passengerEncodedPolyline,
}: SearchRideCardProps) {

  const navigate = useNavigate();
  const pickupAutocomplete =
    useRef<google.maps.places.Autocomplete | null>(null);

  const destinationAutocomplete =
    useRef<google.maps.places.Autocomplete | null>(null);

  const [pickupInput, setPickupInput] =
    useState(pickup?.address ?? "");

  const [destinationInput, setDestinationInput] =
    useState(destination?.address ?? "");

  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    setPickupInput(pickup?.address ?? "");
  }, [pickup]);

  useEffect(() => {
    setDestinationInput(destination?.address ?? "");
  }, [destination]);

  const handleSearchRide = async () => {

    let h = Number(hour);

    if (period === "PM" && h !== 12)
      h += 12;

    if (period === "AM" && h === 12)
      h = 0;

    const now = new Date();

    const departureTime =
      `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(
        now.getDate()
      ).padStart(2, "0")}T${String(h).padStart(
        2,
        "0"
      )}:${minute}:00`;

    const request: SearchRideRequest = {
      source: {
        latitude: pickup!.latitude,
        longitude: pickup!.longitude,
        address: pickup!.address,
      },

      destination: {
        latitude: destination!.latitude,
        longitude: destination!.longitude,
        address: destination!.address,
      },

      passengerEncodedPolyline,

      departureTime,
    };

    console.log(request);

     const rides = await searchRides(request);
     console.log(rides)

    navigate("/search-results", {
    state: {
        rides,
        searchRequest: request
    }
});
  };

  return (
    <div className="absolute top-10 left-10 w-[430px]">

      <div className="bg-white rounded-3xl shadow-2xl p-8">

        <div className="flex items-center gap-3">

          <button
            onClick={() => setStep("welcome")}
            className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h2 className="text-2xl font-bold">
              Search Ride
            </h2>

            <p className="text-gray-500 text-sm">
              Find rides matching your route.
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
              onLoad={(a) =>
                (pickupAutocomplete.current = a)
              }
              onPlaceChanged={() => {

                const place =
                  pickupAutocomplete.current?.getPlace();

                if (!place?.geometry?.location)
                  return;

                setPickup({
                  address:
                    place.formatted_address ?? "",
                  latitude: place.geometry.location.lat(),
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
              onLoad={(a) =>
                (destinationAutocomplete.current =
                  a)
              }
              onPlaceChanged={() => {

                const place =
                  destinationAutocomplete.current?.getPlace();

                if (!place?.geometry?.location)
                  return;

                setDestination({
                  address:
                    place.formatted_address ?? "",
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
                  setDestinationInput(
                    e.target.value
                  )
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

        {/* Time */}

        <div className="mt-5">

          <label className="font-semibold text-gray-700">
            Departure Time
          </label>

          <div className="mt-2 flex items-center justify-between border rounded-xl px-4 py-3">

            <FaClock className="text-gray-500" />

            <div className="flex items-center gap-2">

              <input
                value={hour}
                onChange={(e) =>
                  setHour(e.target.value)
                }
                className="w-10 border rounded text-center"
              />

              :

              <input
                value={minute}
                onChange={(e) =>
                  setMinute(e.target.value)
                }
                className="w-10 border rounded text-center"
              />

              <button
                onClick={() =>
                  setPeriod("AM")
                }
                className={`px-2 py-1 rounded ${
                  period === "AM"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                AM
              </button>

              <button
                onClick={() =>
                  setPeriod("PM")
                }
                className={`px-2 py-1 rounded ${
                  period === "PM"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                PM
              </button>

            </div>

          </div>

        </div>

        <button
          onClick={handleSearchRide}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3"
        >
          <FaSearch />

          Search Ride

        </button>

      </div>

    </div>
  );
}

export default SearchRideCard;