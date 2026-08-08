import {
  FaCar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import type { PassengerRideHistory } from "../interfaces/PassengerRideHistoryType";

interface PassengerRideHistoryCardProps {
  ride: PassengerRideHistory;
}

function PassengerRideHistoryCard({
  ride,
}: PassengerRideHistoryCardProps) {

  const completedDate = new Date(
    ride.completedAt
  ).toLocaleString();

  const startedTime = new Date(
    ride.startedAt
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const completedTime = new Date(
    ride.completedAt
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (

    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <FaCheckCircle className="text-green-500 text-xl" />

          <span className="font-semibold text-green-700">

            Completed

          </span>

        </div>

        <span className="text-sm text-gray-500">

          {completedDate}

        </span>

      </div>

      {/* Driver */}

      <div className="flex items-center gap-4 mt-6">

        <img
          src={`http://localhost:8082${ride.driverProfilePicture}`}
          alt="Driver"
          className="w-16 h-16 rounded-full border object-cover"
        />

        <div className="flex-1">

          <h2 className="text-xl font-bold">

            {ride.driverName}

          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-1">

            <FaPhoneAlt />

            <span>{ride.driverPhoneNumber}</span>

          </div>

        </div>

      </div>

      {/* Vehicle */}

      <div className="mt-6 bg-gray-50 rounded-xl p-4">

        <div className="flex items-center gap-2 mb-3">

          <FaCar className="text-blue-600" />

          <span className="font-semibold">

            Vehicle

          </span>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <div>

            <p className="text-xs text-gray-500">

              Model

            </p>

            <p className="font-semibold">

              {ride.vehicleModel}

            </p>

          </div>

          <div>

            <p className="text-xs text-gray-500">

              Number

            </p>

            <p className="font-semibold">

              {ride.vehicleNumber}

            </p>

          </div>

          <div>

            <p className="text-xs text-gray-500">

              Color

            </p>

            <p className="font-semibold">

              {ride.vehicleColor}

            </p>

          </div>

        </div>

      </div>

      {/* Route */}

      <div className="mt-6">

        <div className="flex items-start gap-3">

          <FaMapMarkerAlt className="text-blue-600 mt-1" />

          <div>

            <p className="text-sm text-gray-500">

              Pickup

            </p>

            <h3 className="font-semibold">

              {ride.source.address}

            </h3>

          </div>

        </div>

        <div className="ml-2 h-10 border-l-2 border-dashed border-gray-300" />

        <div className="flex items-start gap-3">

          <FaMapMarkerAlt className="text-red-500 mt-1" />

          <div>

            <p className="text-sm text-gray-500">

              Destination

            </p>

            <h3 className="font-semibold">

              {ride.destination.address}

            </h3>

          </div>

        </div>

      </div>

      {/* Ride Details */}

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="bg-gray-100 rounded-xl p-4 text-center">

          <FaRegClock className="mx-auto text-gray-500 mb-2" />

          <p className="text-xs text-gray-500">

            Started

          </p>

          <h3 className="font-semibold">

            {startedTime}

          </h3>

        </div>

        <div className="bg-gray-100 rounded-xl p-4 text-center">

          <FaRegClock className="mx-auto text-gray-500 mb-2" />

          <p className="text-xs text-gray-500">

            Completed

          </p>

          <h3 className="font-semibold">

            {completedTime}

          </h3>

        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">

          <p className="text-xs text-gray-500">

            Fare Paid

          </p>

          <h3 className="text-xl font-bold text-green-600">

            ₹{ride.ridePrice}

          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 border-t pt-4 flex justify-between text-sm text-gray-500">

        <span>

          Ride #{ride.rideId}

        </span>

        <span>

          {ride.rideStatus}

        </span>

      </div>

    </div>

  );
}

export default PassengerRideHistoryCard;