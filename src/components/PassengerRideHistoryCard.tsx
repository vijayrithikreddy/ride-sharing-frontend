import {
  FaMotorcycle,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaRupeeSign,
  FaUserCircle,
} from "react-icons/fa";
import type { PassengerRideHistoryType } from "../interfaces/PassengerRideHistoryType";

interface PassengerRideHistoryCardProps {
  ride: PassengerRideHistoryType;
}

function PassengerRideHistoryCard({ ride }: PassengerRideHistoryCardProps) {
  const completedDate = new Date(ride.completedAt).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const startedTime = new Date(ride.startedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const completedTime = new Date(ride.completedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden">
      {/* Top Completion Header Bar */}
      <div className="bg-emerald-50/80 px-6 py-3.5 border-b border-emerald-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-emerald-600 text-sm" />
          <span className="font-bold text-xs text-emerald-800 uppercase tracking-wider">
            Ride Completed
          </span>
        </div>
        <span className="text-xs font-semibold text-gray-500">{completedDate}</span>
      </div>

      <div className="p-6">
        {/* Driver Profile */}
        <div className="flex justify-between items-center pb-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {ride.driverProfilePicture ? (
              <img
                src={`https://ride-sharing-platform-user.onrender.com${ride.driverProfilePicture}`}
                alt="Driver"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-sm flex-shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FaUserCircle size={32} />
              </div>
            )}

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Motorcycle Rider
              </span>
              <h2 className="text-lg font-extrabold text-gray-900 leading-snug">
                {ride.driverName}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                <FaPhoneAlt className="text-[10px] text-blue-600" />
                <span>{ride.driverPhoneNumber || "No phone listed"}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Ride ID
            </span>
            <h3 className="font-extrabold text-gray-900 text-sm">#{ride.rideId}</h3>
          </div>
        </div>

        {/* Vehicle Information Box */}
        <div className="my-4 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FaMotorcycle className="text-blue-600 text-sm" />
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Vehicle Details
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-400 block">Model</span>
              <span className="font-bold text-gray-800">{ride.vehicleModel || "--"}</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-400 block">Number</span>
              <span className="font-bold text-gray-800">{ride.vehicleNumber || "--"}</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-400 block">Color</span>
              <span className="font-bold text-gray-800">{ride.vehicleColor || "--"}</span>
            </div>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="py-3 space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50 mt-1 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
              <h3 className="font-semibold text-xs sm:text-sm text-gray-800">
                {typeof ride.source === "string" ? ride.source : (ride.source as any)?.address}
              </h3>
            </div>
          </div>

          <div className="ml-[5px] h-4 border-l-2 border-dashed border-gray-300" />

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-rose-500 text-sm mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
              <h3 className="font-semibold text-xs sm:text-sm text-gray-800">
                {typeof ride.destination === "string" ? ride.destination : (ride.destination as any)?.address}
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center">
          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-700 uppercase">
              <FaRupeeSign className="text-xs" /> Fare Paid
            </div>
            <h3 className="text-base font-extrabold text-emerald-800 mt-0.5">₹{ride.ridePrice}</h3>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
              <FaClock className="text-blue-500 text-xs" /> Started
            </div>
            <h3 className="text-xs font-extrabold text-gray-800 mt-1">{startedTime}</h3>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
              <FaClock className="text-blue-500 text-xs" /> Completed
            </div>
            <h3 className="text-xs font-extrabold text-gray-800 mt-1">{completedTime}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerRideHistoryCard;