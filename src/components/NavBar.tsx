import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSignOutAlt, FaUser, FaUserCircle, FaMotorcycle, FaExchangeAlt, FaTachometerAlt, FaRoute, FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateUserMode } from "../service/UserService";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useContext(AuthContext);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentUserType = localStorage.getItem("userType") || "PASSENGER";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white h-16 shadow-md flex items-center justify-between px-4 sm:px-8 z-30">
      {/* Left Section: Brand + Links */}
      <div className="flex items-center gap-6 sm:gap-8">
        {/* Brand */}
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <FaMotorcycle className="text-white text-lg" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Ride Share
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate("/home")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive("/home")
                ? "bg-white/20 text-white shadow-sm"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaHome className="text-xs" />
            Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-white/20 text-white shadow-sm"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaTachometerAlt className="text-xs" />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/my-rides")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive("/my-rides")
                ? "bg-white/20 text-white shadow-sm"
                : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FaRoute className="text-xs" />
            My Rides
          </button>
        </div>
      </div>

      {/* Right Section: Mode Switcher + Profile Menu */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Mode Badge / Switch Button */}
        {currentUserType === "RIDER" ? (
          <button
            onClick={() => {
              localStorage.setItem("userType", "PASSENGER");
              navigate("/home");
              updateUserMode("PASSENGER");
              window.location.reload();
            }}
            className="flex items-center gap-2 bg-white/15 hover:bg-white text-white hover:text-blue-700 border border-white/20 font-semibold px-3.5 py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-sm active:scale-95"
            title="Switch to Passenger Mode"
          >
            <FaExchangeAlt className="text-xs" />
            <span className="hidden sm:inline">Mode:</span>
            <span className="font-extrabold bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-400/30">
              Rider
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.setItem("userType", "RIDER");
              navigate("/home");
              updateUserMode("RIDER");
              window.location.reload();
            }}
            className="flex items-center gap-2 bg-white/15 hover:bg-white text-white hover:text-blue-700 border border-white/20 font-semibold px-3.5 py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-sm active:scale-95"
            title="Switch to Rider Mode"
          >
            <FaExchangeAlt className="text-xs" />
            <span className="hidden sm:inline">Mode:</span>
            <span className="font-extrabold bg-blue-400/30 text-blue-100 px-2 py-0.5 rounded-md border border-blue-300/30">
              Passenger
            </span>
          </button>
        )}

        {/* Profile Dropdown Menu */}
        <div ref={menuRef} className="relative">
          <button
            aria-label="Profile"
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition-opacity p-1"
          >
            <FaUserCircle size={32} />
          </button>

          {/* Dropdown Card */}
          <div
            className={`absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden origin-top-right transition-all duration-200 text-gray-800 ${
              showMenu
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-800">Account Menu</p>
              <p className="text-[10px] text-gray-500 capitalize">
                Active as {currentUserType.toLowerCase()}
              </p>
            </div>

            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
            >
              <FaUser className="text-blue-600 text-xs" />
              <span>View Profile</span>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors border-t border-gray-100"
            >
              <FaSignOutAlt className="text-xs" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;