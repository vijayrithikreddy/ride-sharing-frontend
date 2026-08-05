import {
  FaChevronDown,
  FaChevronUp,
  FaMotorcycle,
  FaRoute,
  FaRupeeSign,
  FaUserCircle,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import type { RideSearchResponse } from "../interfaces/RideSearchResponse";

interface RideCardProps {
  ride: RideSearchResponse;
  expanded: boolean;
  onClick: () => void;
  onRequestRide: (ride: RideSearchResponse) => void;
    requested: boolean;
}

function RideCard({
  ride,
  expanded,
  onClick,
  onRequestRide,
  requested,
}: RideCardProps) {

  const departureTime = new Date(
    ride.departureTime
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div
        onClick={onClick}
        className="cursor-pointer p-5"
      >

        <div className="flex justify-between">

          {/* Driver */}

          <div className="flex gap-4">

            {ride.driverProfile.profilePictureUrl ? (
              <img
                src={`http://localhost:8082${ride.driverProfile.profilePictureUrl}`}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle
                size={55}
                className="text-gray-400"
              />
            )}

            <div>

              <h2 className="font-bold text-lg">

                {ride.driverProfile.firstName}{" "}
                {ride.driverProfile.lastName}

              </h2>

              <p className="text-sm text-gray-500">

                {ride.driverProfile.vehicle
                  ? `${ride.driverProfile.vehicle.brand} ${ride.driverProfile.vehicle.model}`
                  : "Vehicle details unavailable"}

              </p>

            </div>

          </div>

          {/* Price */}

          <div className="text-right">

            <div className="flex items-center justify-end text-2xl font-bold text-green-600">

              <FaRupeeSign size={18} />

              {ride.price}

            </div>

            <p className="text-xs text-gray-500">
              per seat
            </p>

          </div>

        </div>

        {/* Match */}

        <div className="mt-4 flex justify-between items-center">

          <div className="flex items-center gap-2 text-blue-600 font-semibold">

            <FaRoute />

            {ride.matchPercentage.toFixed(0)}% Match

          </div>

          {expanded ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}

        </div>

      </div>

      {/* Expandable Section */}

      <div
        className={`transition-all duration-300 overflow-hidden ${
          expanded
            ? "max-h-[500px]"
            : "max-h-0"
        }`}
      >

        <div className="border-t bg-gray-50 p-5">

          {/* Pickup */}

          <div className="flex gap-3">

            <FaMapMarkerAlt className="text-green-600 mt-1" />

            <div>

              <p className="text-xs text-gray-500">
                Pickup
              </p>

              <p className="font-medium">
                {ride.source.address}
              </p>

            </div>

          </div>

          {/* Destination */}

          <div className="flex gap-3 mt-5">

            <FaMapMarkerAlt className="text-red-500 mt-1" />

            <div>

              <p className="text-xs text-gray-500">
                Destination
              </p>

              <p className="font-medium">
                {ride.destination.address}
              </p>

            </div>

          </div>

          {/* Bottom Details */}

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="bg-white rounded-xl p-4">

              <div className="flex items-center gap-2 text-gray-500">

                <FaClock />

                Departure

              </div>

              <p className="font-semibold mt-2">
                {departureTime}
              </p>

            </div>

            <div className="bg-white rounded-xl p-4">

              <div className="flex items-center gap-2 text-gray-500">

                <FaMotorcycle />

                Vehicle

              </div>

              <p className="font-semibold mt-2">

                {ride.driverProfile.vehicle
                  ? ride.driverProfile.vehicle.vehicleType
                  : "--"}

              </p>

            </div>

          </div>

          {/* Vehicle Details */}

          {ride.driverProfile.vehicle && (

            <div className="mt-5 rounded-xl bg-white p-4">

              <h4 className="font-semibold mb-2">

                Vehicle Details

              </h4>

              <div className="text-sm text-gray-600 space-y-1">

                <p>

                  <strong>Brand:</strong>{" "}
                  {ride.driverProfile.vehicle.brand}

                </p>

                <p>

                  <strong>Model:</strong>{" "}
                  {ride.driverProfile.vehicle.model}

                </p>

                <p>

                  <strong>Color:</strong>{" "}
                  {ride.driverProfile.vehicle.color}

                </p>

              </div>

            </div>

          )}

          {/* Request Button */}

          <div className="mt-6 flex justify-end">

  {requested ? (

    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

      <span className="h-2 w-2 rounded-full bg-green-600"></span>

      Requested

    </div>

  ) : (

    <button
      onClick={(e) => {
        e.stopPropagation();
        onRequestRide(ride)
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
    >
      Request Ride
    </button>

  )}

</div>

        </div>

      </div>

    </div>
  );
}

export default RideCard;