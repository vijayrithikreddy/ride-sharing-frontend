import {
  FaChevronDown,
  FaChevronUp,
  FaMotorcycle,
  FaRoute,
  FaRupeeSign,
  FaUserCircle,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import type { RideSearchResponse } from "../interfaces/RideSearchResponse";

interface RideCardProps {
  ride: RideSearchResponse;
  expanded: boolean;
  onClick: () => void;
  onRequestRide: (ride: RideSearchResponse) => void;
  requestStatus?: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
}

function RideCard({
  ride,
  expanded,
  onClick,
  onRequestRide,
  requestStatus,
}: RideCardProps) {
  const departureTime = new Date(ride.departureTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        expanded
          ? "border-blue-500 shadow-xl ring-2 ring-blue-50"
          : "border-gray-100 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Card Header */}
      <div onClick={onClick} className="cursor-pointer p-4 sm:p-5">
        <div className="flex justify-between items-start">
          {/* Driver Profile */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
              {ride.driverProfile.profilePictureUrl ? (
                <img
                  src={`https://ride-sharing-platform-user.onrender.com${ride.driverProfile.profilePictureUrl}`}
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex justify-center items-center">
                  <FaUserCircle className="text-blue-600" size={28} />
                </div>
              )}
            </div>

            <div>
              <h3 className="font-extrabold text-base text-gray-900 leading-snug">
                {ride.driverProfile.firstName} {ride.driverProfile.lastName}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                <FaMotorcycle className="text-gray-400" />
                {ride.driverProfile.vehicle
                  ? `${ride.driverProfile.vehicle.brand} ${ride.driverProfile.vehicle.model}`
                  : "Motorcycle available"}
              </p>
            </div>
          </div>

          {/* Price Tag */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-center justify-end text-xl font-extrabold text-emerald-600">
              <FaRupeeSign className="text-sm" />
              {ride.price}
            </div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              per seat
            </p>
          </div>
        </div>

        {/* Match Percentage & Expand Chevron */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
            <FaRoute className="text-xs" />
            {ride.matchPercentage.toFixed(0)}% Route Match
          </div>

          <div className="text-gray-400 flex items-center gap-1 text-xs font-semibold hover:text-blue-600">
            <span>{expanded ? "Hide Details" : "View Details"}</span>
            {expanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          expanded ? "max-h-[500px] border-t border-gray-100 bg-gray-50/60" : "max-h-0"
        }`}
      >
        <div className="p-5 space-y-4">
          {/* Pickup & Destination Timeline */}
          <div className="space-y-3 bg-white p-3.5 rounded-xl border border-gray-100">
            <div className="flex items-start gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                <p className="text-xs font-semibold text-gray-800">{ride.source.address}</p>
              </div>
            </div>

            <div className="ml-[4px] h-3 border-l-2 border-dashed border-gray-300" />

            <div className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-rose-500 text-xs mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
                <p className="text-xs font-semibold text-gray-800">{ride.destination.address}</p>
              </div>
            </div>
          </div>

          {/* Ride Details Pills */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                <FaClock className="text-blue-600" /> Departure
              </div>
              <p className="font-bold text-sm text-gray-900 mt-1">{departureTime}</p>
            </div>

            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                <FaMotorcycle className="text-blue-600" /> Vehicle Type
              </div>
              <p className="font-bold text-sm text-gray-900 mt-1 truncate">
                {ride.driverProfile.vehicle ? ride.driverProfile.vehicle.vehicleType : "Motorcycle"}
              </p>
            </div>
          </div>

          {/* Detailed Vehicle Specs */}
          {ride.driverProfile.vehicle && (
            <div className="rounded-xl bg-white p-3.5 border border-gray-100 text-xs text-gray-600 space-y-1">
              <p className="font-bold text-gray-800 mb-1.5 uppercase tracking-wider text-[10px]">
                Vehicle Specifications
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="text-[10px] text-gray-400 block">Brand</span>
                  <span className="font-bold text-gray-800">{ride.driverProfile.vehicle.brand}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="text-[10px] text-gray-400 block">Model</span>
                  <span className="font-bold text-gray-800">{ride.driverProfile.vehicle.model}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="text-[10px] text-gray-400 block">Color</span>
                  <span className="font-bold text-gray-800">{ride.driverProfile.vehicle.color}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTA / Status */}
          <div className="pt-2 flex justify-end">
            {requestStatus === "PENDING" ? (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-xl font-bold text-xs">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                Request Pending Approval
              </div>
            ) : requestStatus === "ACCEPTED" ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl font-bold text-xs">
                <FaCheckCircle className="text-emerald-600" />
                Request Accepted!
              </div>
            ) : requestStatus === "REJECTED" ? (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 rounded-xl font-bold text-xs">
                Request Rejected
              </div>
            ) : requestStatus === "CANCELLED" ? (
              <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold text-xs">
                Cancelled
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRequestRide(ride);
                }}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md shadow-blue-600/25 transition-all duration-200"
              >
                Request Seat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideCard;