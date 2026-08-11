import {
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import type { RideRequestResponse } from "../interfaces/RideRequestResponse";

interface PassengerRequestCardProps {
  request: RideRequestResponse;
  expanded: boolean;
  onClick: () => void;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

function PassengerRequestCard({
  request,
  expanded,
  onClick,
  onAccept,
  onReject,
}: PassengerRequestCardProps) {
  const profileUrl = request.passengerProfile.profilePictureUrl
    ? `https://ride-sharing-platform-user.onrender.com${request.passengerProfile.profilePictureUrl}`
    : "";

  const departure = new Date(request.departureTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${expanded
        ? "border-blue-500 shadow-xl ring-2 ring-blue-50"
        : "border-gray-100 shadow-sm hover:shadow-md"
        }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Passenger"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex justify-center items-center">
                <FaUserCircle className="text-blue-600" size={28} />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-base text-gray-900 leading-snug">
              {request.passengerProfile.firstName}{" "}
              {request.passengerProfile.lastName}
            </h3>

            <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {request.matchPercentage.toFixed(0)}% Match
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onReject(request.requestId)}
            className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 flex justify-center items-center transition text-rose-600"
            title="Reject Request"
          >
            <FaTimes className="text-xs" />
          </button>

          <button
            onClick={() => onAccept(request.requestId)}
            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 flex justify-center items-center transition text-white shadow-sm"
            title="Accept Request"
          >
            <FaCheck className="text-xs" />
          </button>

          <div className="ml-1 text-gray-400">
            {expanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </div>
        </div>
      </div>

      {/* Expanded Route Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-[300px] border-t border-gray-100 bg-gray-50/50" : "max-h-0"
          }`}
      >
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
              <p className="text-xs font-semibold text-gray-800">{request.source.address}</p>
            </div>
          </div>

          <div className="ml-[4px] h-4 border-l-2 border-dashed border-gray-300" />

          <div className="flex items-start gap-2.5">
            <FaMapMarkerAlt className="text-rose-500 text-xs mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
              <p className="text-xs font-semibold text-gray-800">{request.destination.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-200/60">
            <FaClock className="text-blue-600 text-xs" />
            <span>Departure Time: {departure}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerRequestCard;