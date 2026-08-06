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
  const departureTime = new Date(
    ride.departureTime
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl text-white overflow-hidden">
      <div className="p-7">
        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase tracking-widest text-blue-100 text-xs font-semibold">
              RIDE ACCEPTED
            </p>

            <h2 className="text-3xl font-bold mt-1">
              Your Driver is Ready 🚀
            </h2>
          </div>

          <FaCheckCircle
            size={45}
            className="text-green-300"
          />
        </div>

        {/* Driver */}

        <div className="mt-7 flex items-center gap-4">
          {ride.driverProfilePicture ? (
            <img
              src={`http://localhost:8082${ride.driverProfilePicture}`}
              alt="Driver"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle
              size={60}
              className="text-white"
            />
          )}

          <div>
            <h3 className="text-xl font-bold">
              {ride.driverName}
            </h3>

            <p className="text-blue-100">
              {ride.vehicleBrand
                ? `${ride.vehicleBrand} ${ride.vehicleModel}`
                : ride.vehicleModel}
            </p>
          </div>
        </div>

        {/* Route */}

        <div className="mt-8 space-y-5">
          <div className="flex gap-3">
            <FaMapMarkerAlt className="mt-1 text-green-300" />

            <div>
              <p className="text-blue-100 text-sm">
                Pickup
              </p>

              <h4 className="font-semibold">
                {ride.source.address}
              </h4>
            </div>
          </div>

          <div className="flex gap-3">
            <FaMapMarkerAlt className="mt-1 text-red-300" />

            <div>
              <p className="text-blue-100 text-sm">
                Destination
              </p>

              <h4 className="font-semibold">
                {ride.destination.address}
              </h4>
            </div>
          </div>
        </div>

        {/* Ride Info */}

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-white/15 rounded-xl p-3">
            <FaClock />

            <p className="text-xs mt-2">
              Departure
            </p>

            <h4 className="font-bold">
              {departureTime}
            </h4>
          </div>

          <div className="bg-white/15 rounded-xl p-3">
            <FaRupeeSign />

            <p className="text-xs mt-2">
              Price
            </p>

            <h4 className="font-bold">
              ₹{ride.ridePrice}
            </h4>
          </div>

          <div className="bg-white/15 rounded-xl p-3">
            <FaMotorcycle />

            <p className="text-xs mt-2">
              Vehicle
            </p>

            <h4 className="font-bold">
              {ride.vehicleType ?? "--"}
            </h4>
          </div>

          <div className="bg-white/15 rounded-xl p-3">
            <FaCheckCircle />

            <p className="text-xs mt-2">
              Status
            </p>

            <h4 className="font-bold">
              {ride.status}
            </h4>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-8">
          <button
            onClick={onContactRider}
            className="flex-1 bg-white text-blue-700 rounded-2xl py-4 font-semibold hover:bg-blue-50 transition flex justify-center items-center gap-3"
          >
            <FaPhoneAlt />
            Contact Driver
          </button>

          <button
            onClick={onCancelRide}
            className="flex-1 bg-red-500 hover:bg-red-600 rounded-2xl py-4 font-semibold transition"
          >
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveRideCard;