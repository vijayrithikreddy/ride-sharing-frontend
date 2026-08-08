import React from "react";
import {
  FaUserCircle,
  FaMotorcycle,
  FaRoute,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";
import type { RequestRideResponse } from "../interfaces/RequestRideResponse";

interface PendingRideRequestProps {
  ride: RequestRideResponse;
  onCancel: (requestId: number) => void;
}

function PendingRideRequest({ ride, onCancel }: PendingRideRequestProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-5 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Driver Details */}
        <div className="flex items-center gap-3.5">
          {ride.driverProfilePicture ? (
            <img
              src={`http://localhost:8082${ride.driverProfilePicture}`}
              alt="Driver"
              className="h-14 w-14 rounded-2xl object-cover border-2 border-blue-100 flex-shrink-0"
            />
          ) : (
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FaUserCircle size={32} />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-700 border border-amber-200 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Awaiting Approval
              </span>
            </div>

            <h3 className="mt-1 text-base font-extrabold text-gray-900 leading-snug">
              {ride.driverName}
            </h3>

            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
              <FaMotorcycle className="text-gray-400" />
              {ride.vehicleBrand
                ? `${ride.vehicleBrand} ${ride.vehicleModel}`
                : ride.vehicleModel ?? "Motorcycle"}
            </p>

            <div className="mt-1.5 inline-flex items-center gap-1 text-blue-600 font-bold text-xs">
              <FaRoute className="text-xs" />
              {ride.matchPercentage.toFixed(0)}% Route Match
            </div>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
          <div className="text-left sm:text-right">
            <div className="flex items-center text-lg font-extrabold text-emerald-600">
              <FaRupeeSign className="text-sm" />
              {ride.ridePrice}
              <span className="text-[10px] text-gray-400 font-medium ml-1">/ seat</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onCancel(ride.requestId)}
            className="rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-1.5 text-xs font-bold transition-all duration-200"
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingRideRequest;