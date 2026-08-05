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
    ? `http://localhost:8082${request.passengerProfile.profilePictureUrl}`
    : "";

  const departure = new Date(
    request.departureTime
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden
      ${
        expanded
          ? "border-blue-500 shadow-xl"
          : "border-gray-100 shadow-md hover:shadow-lg"
      }`}
    >
      {/* Header */}

      <div className="p-5 flex justify-between items-center">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">

            {profileUrl ? (

              <img
                src={profileUrl}
                alt="Passenger"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full bg-blue-100 flex justify-center items-center">

                <FaUserCircle
                  className="text-blue-600"
                  size={34}
                />

              </div>

            )}

          </div>

          <div>

            <h3 className="font-bold text-lg text-gray-800">

              {request.passengerProfile.firstName}{" "}
              {request.passengerProfile.lastName}

            </h3>

            <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">

              {request.matchPercentage.toFixed(0)}% Match

            </div>

          </div>

        </div>

        {/* Right */}

        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            onClick={() => onReject(request.requestId)}
            className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 flex justify-center items-center transition"
          >

            <FaTimes className="text-red-600" />

          </button>

          <button
            onClick={() => onAccept(request.requestId)}
            className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 flex justify-center items-center transition"
          >

            <FaCheck className="text-white" />

          </button>

          {expanded ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}

        </div>

      </div>

      {/* Expanded Section */}

      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? "max-h-[350px]" : "max-h-0"
        }`}
      >

        <div className="border-t px-6 py-5">

          <div className="space-y-5">

            <div className="flex gap-3">

              <FaMapMarkerAlt className="text-green-600 mt-1" />

              <div>

                <p className="text-xs text-gray-500">
                  Pickup
                </p>

                <p className="font-semibold">
                  {request.source.address}
                </p>

              </div>

            </div>

            <div className="ml-[7px] h-6 border-l-2 border-dashed border-gray-300"></div>

            <div className="flex gap-3">

              <FaMapMarkerAlt className="text-red-500 mt-1" />

              <div>

                <p className="text-xs text-gray-500">
                  Destination
                </p>

                <p className="font-semibold">
                  {request.destination.address}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 text-gray-600 pt-2">

              <FaClock />

              <span className="font-medium">

                Departure : {departure}

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PassengerRequestCard;