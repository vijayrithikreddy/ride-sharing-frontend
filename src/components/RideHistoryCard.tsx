import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRupeeSign,
} from "react-icons/fa";
import type { RideHistory } from "../interfaces/RideHistory";

interface RideHistoryCardProps {
  ride: RideHistory;
}

function RideHistoryCard({
  ride,
}: RideHistoryCardProps) {

  const completedDate = new Date(
    ride.completedAt
  ).toLocaleDateString();

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

    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

      {/* Header */}

      <div className="bg-green-50 px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">

          <FaCheckCircle className="text-green-600 text-xl" />

          <span className="font-semibold text-green-700">

            Completed

          </span>

        </div>

        <span className="text-sm text-gray-600">

          {completedDate}

        </span>

      </div>

      <div className="p-6">

        {/* Passenger */}

        <div className="flex justify-between">

          <div className="flex gap-4">

            <img
              src={`http://localhost:8082${ride.passengerProfilePicture}`}
              alt="Passenger"
              className="w-16 h-16 rounded-full border object-cover"
            />

            <div>

              <h2 className="text-xl font-bold">

                {ride.passengerName}

              </h2>

              <div className="flex items-center gap-2 mt-1 text-gray-500">

                <FaPhoneAlt />

                {ride.passengerPhoneNumber}

              </div>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">

              Ride ID

            </p>

            <h3 className="font-bold">

              #{ride.rideId}

            </h3>

          </div>

        </div>

        {/* Route */}

        <div className="mt-8">

          <div className="flex gap-4">

            <div className="flex flex-col items-center">

              <FaMapMarkerAlt className="text-blue-600" />

              <div className="w-0.5 h-12 bg-gray-300 my-1" />

              <FaMapMarkerAlt className="text-red-500" />

            </div>

            <div className="flex-1">

              <div>

                <p className="text-xs text-gray-500">

                  Pickup

                </p>

                <h3 className="font-semibold">

                  {ride.source}

                </h3>

              </div>

              <div className="mt-8">

                <p className="text-xs text-gray-500">

                  Destination

                </p>

                <h3 className="font-semibold">

                  {ride.destination}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Stats */}

        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-green-50 rounded-xl p-4 text-center">

            <FaRupeeSign className="mx-auto text-green-600 mb-2" />

            <p className="text-xs text-gray-500">

              Fare Earned

            </p>

            <h3 className="text-xl font-bold text-green-700">

              ₹{ride.ridePrice}

            </h3>

          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-center">

            <p className="text-xs text-gray-500">

              Started

            </p>

            <h3 className="font-semibold">

              {startedTime}

            </h3>

          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-center">

            <p className="text-xs text-gray-500">

              Completed

            </p>

            <h3 className="font-semibold">

              {completedTime}

            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RideHistoryCard;