import { Autocomplete } from "@react-google-maps/api";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaMotorcycle,
  FaMapPin,
} from "react-icons/fa";
import "../styles/google.css";
import type { Location } from "../interfaces/Location.ts";
import { publishRide } from "../service/RideService.ts";
import type { CreateRideRequest } from "../interfaces/CreateRideRequest.ts";
import { RideContext } from "../context/RideContext.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  encodedPolyline: string;
}

function PublishRideCard({
  setStep,
  pickup,
  destination,
  setPickup,
  setDestination,
  selecting,
  setSelecting,
  encodedPolyline,
}: PublishRideCardProps) {
  const { setActiveRide } = useContext(RideContext);
  const navigate = useNavigate();

  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handlePublishRide = async () => {
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

    const departureTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )}T${String(hour24).padStart(2, "0")}:${String(
      Number(minute)
    ).padStart(2, "0")}:00`;

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
    try {
      const response = await publishRide(request);
      setActiveRide(response);
      toast.success("Ride published successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to publish ride. Please try again.");
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
                Publish Ride
              </h2>
              <p className="text-xs text-gray-500">Offer your pillion seat</p>
            </div>
          </div>

          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
            <FaMotorcycle className="text-xs" /> Rider
          </span>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Starting Address (Pickup) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="publish-pickup" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Starting Location
              </label>
              <button
                type="button"
                disabled={selecting === "pickup"}
                onClick={() => setSelecting("pickup")}
                className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all duration-200 ${
                  selecting === "pickup"
                    ? "bg-emerald-500 text-white border-emerald-500 animate-pulse shadow-sm"
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
                onLoad={(autocomplete) => {
                  pickupAutocomplete.current = autocomplete;
                }}
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
                  id="publish-pickup"
                  type="text"
                  placeholder="Enter starting pickup address"
                  value={pickupInput}
                  onChange={(e) => setPickupInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-900 text-sm placeholder-gray-400 outline-none"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Destination Address */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="publish-destination" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                  setDestinationInput(place.formatted_address ?? "");
                }}
              >
                <input
                  id="publish-destination"
                  type="text"
                  placeholder="Enter destination address"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-gray-900 text-sm placeholder-gray-400 outline-none"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Time & Price in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Start Time */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl bg-gray-50 p-2 text-xs">
                <FaClock className="text-gray-400 text-xs ml-1 flex-shrink-0" />
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="w-8 py-1 text-center font-bold bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                />
                <span className="font-bold text-gray-400">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className="w-8 py-1 text-center font-bold bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                />
                <div className="flex gap-0.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setPeriod("AM")}
                    className={`px-1.5 py-1 text-[10px] font-bold rounded-md transition-colors ${
                      period === "AM"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod("PM")}
                    className={`px-1.5 py-1 text-[10px] font-bold rounded-md transition-colors ${
                      period === "PM"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="publish-price" className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Price / Seat
              </label>
              <div className="relative flex items-center border border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all duration-200">
                <FaRupeeSign className="absolute left-3 text-emerald-600 text-xs flex-shrink-0" />
                <input
                  id="publish-price"
                  type="number"
                  placeholder="e.g. 50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 bg-transparent text-gray-900 text-xs font-bold placeholder-gray-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handlePublishRide}
            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? "Publishing Ride..." : "Publish Ride"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PublishRideCard;