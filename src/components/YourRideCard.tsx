import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaPhone,
  FaPlay,
  FaRupeeSign,
  FaUserCircle,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import type { RideResponse } from "../interfaces/RideResponse";

interface ActiveRideCardProps {
  ride: RideResponse;
  onStartRide: () => void;
  onCancelRide: () => void;
}

function YourRideCard({
  ride,
  onStartRide,
  onCancelRide,
}: ActiveRideCardProps) {
  const departureTime = new Date(ride.departureTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl shadow-xl text-white overflow-hidden relative">
      {/* Background glow accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="p-7 relative z-10">
        {/* Header */}
        {ride.status === "AVAILABLE" ? (
          <div className="flex justify-between items-center pb-5 border-b border-white/15">
            <div>
              <span className="uppercase tracking-widest text-[11px] font-bold text-emerald-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                Active Published Ride
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
                Ready to Start 🚀
              </h2>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white shadow-md">
              <FaMotorcycle size={26} />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center pb-5 border-b border-white/15">
            <div className="flex items-center gap-4">
              {ride.passengerProfile?.profilePictureUrl ? (
                <img
                  src={`https://ride-sharing-platform-user.onrender.com${ride.passengerProfile.profilePictureUrl}`}
                  alt="Passenger"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/80 shadow-md"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex justify-center items-center">
                  <FaUserCircle size={36} className="text-white" />
                </div>
              )}
              <div>
                <span className="uppercase tracking-widest text-[10px] font-bold text-emerald-200">
                  Passenger Joined
                </span>
                <h2 className="text-xl font-extrabold">
                  {ride.passengerProfile?.firstName}{" "}
                  {ride.passengerProfile?.lastName}
                </h2>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {ride.passengerProfile?.phoneNumber || "No phone listed"}
                </p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center">
              <FaMotorcycle size={22} />
            </div>
          </div>
        )}

        {/* Route Details Timeline */}
        <div className="py-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-white ring-4 ring-white/20 mt-1 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider">
                Starting Location
              </p>
              <h3 className="font-bold text-sm sm:text-base leading-snug">
                {ride.source.address}
              </h3>
            </div>
          </div>

          <div className="ml-[6px] h-6 border-l-2 border-dashed border-white/40" />

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-rose-300 text-sm mt-1 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider">
                Destination
              </p>
              <h3 className="font-bold text-sm sm:text-base leading-snug">
                {ride.destination.address}
              </h3>
            </div>
          </div>
        </div>

        {/* Ride Info Pills */}
        <div className="grid grid-cols-3 gap-3 pt-2 pb-6 border-t border-white/15">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
              <FaClock className="text-xs" /> Departure
            </div>
            <h4 className="text-sm sm:text-base font-bold mt-1">
              {departureTime}
            </h4>
          </div>

          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-1 text-emerald-200 text-xs font-semibold">
              <FaRupeeSign className="text-xs" /> Price/Seat
            </div>
            <h4 className="text-sm sm:text-base font-bold mt-1 flex items-center">
              ₹{ride.price}
            </h4>
          </div>

          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-1 text-emerald-200 text-xs font-semibold">
              <FaCheckCircle className="text-xs" /> Status
            </div>
            <h4 className="text-xs sm:text-sm font-bold mt-1 truncate">
              {ride.status}
            </h4>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onStartRide}
            className="flex-1 bg-white text-emerald-800 hover:bg-emerald-50 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <FaPlay className="text-xs" /> Start Ride <FaArrowRight className="text-xs" />
          </button>

          {ride.status === "AVAILABLE" ? (
            <button
              onClick={onCancelRide}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-3.5 font-bold transition-all duration-200 active:scale-[0.98]"
            >
              Cancel Ride
            </button>
          ) : (
            <button
              onClick={() =>
                window.open(`tel:${ride.passengerProfile?.phoneNumber}`)
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-bold flex justify-center items-center gap-2 transition-all duration-200"
            >
              <FaPhone className="text-xs" /> Call Passenger
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourRideCard;