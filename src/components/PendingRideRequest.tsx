import {
  FaUserCircle,
  FaMotorcycle,
  FaRoute,
  FaRupeeSign,
} from "react-icons/fa";
import type { RequestRideResponse } from "../interfaces/RequestRideResponse";

interface PendingRideRequestProps {
  ride: RequestRideResponse;
  onCancel: (requestId: number) => void;
}

function PendingRideRequest({
  ride,
  onCancel,
}: PendingRideRequestProps) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-5">
      <div className="flex justify-between">
        {/* Left */}

        <div className="flex gap-4">
          {ride.driverProfilePicture ? (
            <img
              src={`http://localhost:8082${ride.driverProfilePicture}`}
              alt="Driver"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle
              size={60}
              className="text-gray-400"
            />
          )}

          <div>
            {/* Status */}

            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              Waiting Approval
            </span>

            {/* Driver Name */}

            <h2 className="mt-2 text-lg font-bold">
              {ride.driverName}
            </h2>

            {/* Vehicle */}

            <p className="text-sm text-gray-500">
              {ride.vehicleBrand
                ? `${ride.vehicleBrand} ${ride.vehicleModel}`
                : ride.vehicleModel ?? "Vehicle unavailable"}
            </p>

            {/* Match Percentage */}

            <div className="mt-3 flex items-center gap-2 text-blue-600 font-semibold text-sm">
              <FaRoute />
              {ride.matchPercentage.toFixed(0)}% Match
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col items-end justify-between">
          {/* Price */}

          <div className="text-right">
            <div className="flex items-center justify-end text-2xl font-bold text-green-600">
              <FaRupeeSign size={18} />
              {ride.ridePrice}
            </div>

            <p className="text-xs text-gray-500">
              per seat
            </p>
          </div>

          {/* Vehicle Type */}

          <div className="mt-4 flex items-center gap-2 text-gray-600">
            <FaMotorcycle />

            <span className="text-sm font-medium">
              {ride.vehicleType ?? "--"}
            </span>
          </div>

          {/* Cancel */}

          <button
            onClick={() => onCancel(ride.requestId)}
            className="mt-5 rounded-xl bg-red-500 px-5 py-2 text-white font-semibold hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingRideRequest;