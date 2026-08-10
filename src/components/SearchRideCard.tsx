import { Autocomplete } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaClock,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaSearch,
  FaUserFriends,
  FaMapPin,
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

  const [pickupInput, setPickupInput] = useState(pickup?.address ?? "");
  const [destinationInput, setDestinationInput] = useState(
    destination?.address ?? ""
  );

  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPickupInput(pickup?.address ?? "");
  }, [pickup]);

  useEffect(() => {
    setDestinationInput(destination?.address ?? "");
  }, [destination]);

  const handleSearchRide = async () => {
    if (!pickup) {
      alert("Please select pickup location.");
      return;
    }

    if (!destination) {
      alert("Please select destination location.");
      return;
    }

    let h = Number(hour);

    if (period === "PM" && h !== 12) h += 12;

    if (period === "AM" && h === 12) h = 0;

    const now = new Date();

    const departureTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )}T${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;

    const request: SearchRideRequest = {
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

      passengerEncodedPolyline,
      departureTime,
    };

    try {
      setLoading(true);
      const rides = await searchRides(request);

      navigate("/search-results", {
        state: {
          rides,
          searchRequest: request,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-6 left-6 z-10 w-[calc(100%-3rem)] max-w-md animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-gray-900/10 p-6 sm:p-7 border border-gray-100 max-h-[85vh] overflow-y-auto">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("welcome")}
              className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 flex items-center justify-center transition-colors"
              title="Back"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                Search Ride
              </h2>
              <p className="text-xs text-gray-500">Find riders on your route</p>
            </div>
          </div>

          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200 uppercase tracking-wider flex items-center gap-1">
            <FaUserFriends className="text-xs" /> Passenger
          </span>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Pickup Location */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="search-pickup" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Pickup Location
              </label>
              <button
                type="button"
                disabled={selecting === "pickup"}
                onClick={() => setSelecting("pickup")}
                className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all duration-200 ${
                  selecting === "pickup"
                    ? "bg-blue-600 text-white border-blue-600 animate-pulse shadow-sm"
                    : "text-blue-600 border-blue-100 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <FaMapPin className="text-[10px]" />
                {selecting === "pickup" ? "Click on Map..." : "Select from Map"}
              </button>
            </div>

            <div className="relative flex items-center border border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all duration-200">
              <FaLocationArrow className="absolute left-3.5 text-blue-600 text-sm flex-shrink-0" />
              <Autocomplete
                onLoad={(a) => (pickupAutocomplete.current = a)}
                onPlaceChanged={() => {
                  const place = pickupAutocomplete.current?.getPlace();
                  if (!place?.geometry?.location) return;

                  setPickup({
                    address: place.formatted_address ?? "",
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                  });
                  setPickupInput(place.formatted_address ?? "");
                }}
              >
                <input
                  id="search-pickup"
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickupInput}
                  onChange={(e) => setPickupInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-900 text-sm placeholder-gray-400 outline-none"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Destination */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="search-destination" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Destination
              </label>
              <button
                type="button"
                disabled={selecting === "destination"}
                onClick={() => setSelecting("destination")}
                className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all duration-200 ${
                  selecting === "destination"
                    ? "bg-rose-500 text-white border-rose-500 animate-pulse shadow-sm"
                    : "text-blue-600 border-blue-100 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <FaMapPin className="text-[10px]" />
                {selecting === "destination" ? "Click on Map..." : "Select from Map"}
              </button>
            </div>

            <div className="relative flex items-center border border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all duration-200">
              <FaMapMarkerAlt className="absolute left-3.5 text-rose-500 text-sm flex-shrink-0" />
              <Autocomplete
                onLoad={(a) => (destinationAutocomplete.current = a)}
                onPlaceChanged={() => {
                  const place = destinationAutocomplete.current?.getPlace();
                  if (!place?.geometry?.location) return;

                  setDestination({
                    address: place.formatted_address ?? "",
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                  });
                  setDestinationInput(place.formatted_address ?? "");
                }}
              >
                <input
                  id="search-destination"
                  type="text"
                  placeholder="Enter destination"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-900 text-sm placeholder-gray-400 outline-none"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Departure Time
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl bg-gray-50 p-2.5 text-xs">
              <FaClock className="text-gray-400 text-sm ml-1 flex-shrink-0" />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="w-9 py-1 text-center font-bold bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                />
                <span className="font-bold text-gray-400">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className="w-9 py-1 text-center font-bold bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="flex gap-1 ml-auto">
                <button
                  type="button"
                  onClick={() => setPeriod("AM")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                    period === "AM"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod("PM")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                    period === "PM"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleSearchRide}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            <FaSearch className="text-xs" />
            {loading ? "Searching Rides..." : "Search Available Rides"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchRideCard;