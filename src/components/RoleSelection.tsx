import { useContext, useState } from "react";
import { FaMotorcycle, FaUserFriends, FaGasPump, FaClock, FaRoute, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as UserService from "../service/UserService";
import { AuthContext } from "../context/AuthContext";
import doodleBg from "../images/rideshare-doodle-bg.png";

function RoleSelection() {
  let { setUserType } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = async (role: "RIDER" | "PASSENGER") => {
    try {
      setLoading(true);

      await UserService.updateUserMode(role);

      setUserType(role);

      localStorage.setItem("userType", role);

      navigate("/home");
    } catch (error) {
      console.error(error);
    } fontFinally: {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative overflow-hidden">
      {/* Top Banner Header */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 py-10 px-6 text-white relative overflow-hidden shadow-md">
        {/* Doodle overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${doodleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mb-4">
            <FaMotorcycle className="text-white text-2xl" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How would you like to commute today?
          </h1>

          <p className="mt-3 text-blue-100 text-base max-w-xl mx-auto leading-relaxed">
            Select your mode. You can offer a seat on your bike as a Rider or ride along as a Passenger. You can easily switch modes anytime.
          </p>
        </div>
      </div>

      {/* Role Selection Cards Container */}
      <div className="flex-1 flex justify-center items-center py-12 px-6 relative z-10">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
          {/* Rider Card */}
          <div
            onClick={() => handleRoleSelection("RIDER")}
            className="group bg-white rounded-3xl p-8 sm:p-10 shadow-lg shadow-gray-200/50 hover:shadow-xl border-2 border-emerald-100 hover:border-emerald-500 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            {/* Corner Badge */}
            <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
              Offer Rides
            </span>

            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
                <FaMotorcycle className="text-emerald-600 group-hover:text-white text-2xl transition-colors duration-300" />
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                Continue as Rider
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Publish your motorcycle commute route, offer spare pillion seats to fellow commuters, split petrol costs, and earn on your daily trips.
              </p>

              {/* Feature Points */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <FaGasPump className="text-emerald-500 text-sm flex-shrink-0" />
                  <span>Split fuel expenses & save money</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <FaRoute className="text-emerald-500 text-sm flex-shrink-0" />
                  <span>Share your regular daily route</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <FaShieldAlt className="text-emerald-500 text-sm flex-shrink-0" />
                  <span>Ride with verified passengers</span>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 group-hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Updating Mode..." : "Continue as Rider"}
              {!loading && <FaArrowRight className="text-xs" />}
            </button>
          </div>

          {/* Passenger Card */}
          <div
            onClick={() => handleRoleSelection("PASSENGER")}
            className="group bg-white rounded-3xl p-8 sm:p-10 shadow-lg shadow-gray-200/50 hover:shadow-xl border-2 border-blue-100 hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            {/* Corner Badge */}
            <span className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              Find Rides
            </span>

            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                <FaUserFriends className="text-blue-600 group-hover:text-white text-2xl transition-colors duration-300" />
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                Continue as Passenger
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Find nearby motorcycle riders heading along your route, request a ride, skip heavy traffic jams, and get affordable daily travel.
              </p>

              {/* Feature Points */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <FaClock className="text-blue-500 text-sm flex-shrink-0" />
                  <span>Beat peak traffic congestion</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <FaGasPump className="text-blue-500 text-sm flex-shrink-0" />
                  <span>Travel at affordable shared rates</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                  <FaShieldAlt className="text-blue-500 text-sm flex-shrink-0" />
                  <span>Ride with rated & verified bike owners</span>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 group-hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Updating Mode..." : "Continue as Passenger"}
              {!loading && <FaArrowRight className="text-xs" />}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400">
        &copy; Ride Share — Motorcycle Pooling Platform
      </footer>
    </div>
  );
}

export default RoleSelection;