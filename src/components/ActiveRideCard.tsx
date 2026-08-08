import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaPhoneAlt,
  FaRupeeSign,
  FaUserCircle,
} from "react-icons/fa";
import type { RequestRideResponse } from "../interfaces/RequestRideResponse";

interface PassengerActiveRideCardProps {
  ride: RequestRideResponse;
  onContactRider: () => void;
  onCancelRide: () => void;
}

function ActiveRideCard({
  ride,
  onContactRider,
  onCancelRide,
}: PassengerActiveRideCardProps) {
  const departureTime = new Date(ride.departureTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-3xl shadow-xl text-white overflow-hidden relative">
      {/* Glow background accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="p-7 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/15">
          <div>
            <span className="uppercase tracking-widest text-[10px] font-bold text-blue-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
              REQUEST ACCEPTED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              Driver Confirmed 🚀
            </h2>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center">
            <FaCheckCircle size={28} />
          </div>
        </div>

        {/* Driver Info */}
        <div className="py-4 flex items-center gap-4">
          {ride.driverProfilePicture ? (
            <img
              src={`http://localhost:8082${ride.driverProfilePicture}`}
              alt="Driver"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/80 shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex justify-center items-center">
              <FaUserCircle size={36} className="text-white" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-extrabold">{ride.driverName}</h3>
            <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
              <FaMotorcycle className="text-blue-200" />
              {ride.vehicleBrand
                ? `${ride.vehicleBrand} ${ride.vehicleModel}`
                : ride.vehicleModel ?? "Motorcycle"}
            </p>
          </div>
        </div>

        {/* Route Details */}
        <div className="py-4 space-y-3 border-t border-white/15">
          <div className="flex items-start gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 mt-1 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Pickup</p>
              <h4 className="font-semibold text-xs sm:text-sm">{ride.source.address}</h4>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <FaMapMarkerAlt className="text-rose-300 text-sm mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Destination</p>
              <h4 className="font-semibold text-xs sm:text-sm">{ride.destination.address}</h4>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2.5 pt-3 pb-5 border-t border-white/15 text-center">
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md">
            <p className="text-[10px] text-blue-200 font-semibold uppercase">Time</p>
            <h4 className="text-xs font-bold mt-0.5">{departureTime}</h4>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md">
            <p className="text-[10px] text-blue-200 font-semibold uppercase">Price</p>
            <h4 className="text-xs font-bold mt-0.5">₹{ride.ridePrice}</h4>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md">
            <p className="text-[10px] text-blue-200 font-semibold uppercase">Vehicle</p>
            <h4 className="text-xs font-bold mt-0.5 truncate">{ride.vehicleType ?? "Bike"}</h4>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-md">
            <p className="text-[10px] text-blue-200 font-semibold uppercase">Status</p>
            <h4 className="text-xs font-bold mt-0.5 text-emerald-300 truncate">{ride.status}</h4>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onContactRider}
            className="flex-1 bg-white text-blue-800 hover:bg-blue-50 py-3 rounded-xl font-bold text-xs sm:text-sm flex justify-center items-center gap-2 shadow-md transition-all duration-200"
          >
            <FaPhoneAlt className="text-xs" /> Contact Driver
          </button>

          <button
            onClick={onCancelRide}
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-3 text-xs sm:text-sm font-bold transition-all duration-200"
          >
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveRideCard;