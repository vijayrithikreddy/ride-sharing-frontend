import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const {userType} = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav className="relative bg-blue-600 h-18 shadow-lg flex items-center justify-between px-8 z-20">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <h1 className="text-white text-3xl font-bold cursor-pointer">
          RideShare
        </h1>

        <button className="text-white font-medium hover:text-blue-100 hover:underline decoration-2 underline-offset-4 transition duration-300">
          Home
        </button>

        <button className="text-white font-medium hover:text-blue-100 hover:underline decoration-2 underline-offset-4 transition duration-300">
          My Rides
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
       {localStorage.getItem("userType") === "RIDER" ? (
  <button className="bg-white text-blue-600 font-semibold px-6 py-1 rounded-lg hover:bg-blue-50 transition">
    Switch to Passenger
  </button>
) : (
  <button className="bg-white text-blue-600 font-semibold px-6 py-1 rounded-lg hover:bg-blue-50 transition">
    Switch to Rider
  </button>
)}

        <div ref={menuRef} className="relative">
          <button
            aria-label="Profile"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-white hover:text-blue-100 transition"
          >
            <FaUserCircle size={38} />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border overflow-hidden origin-top
            transition-all duration-300 ease-out
            ${
              showMenu
                ? "opacity-100 translate-y-0 scale-y-100"
                : "opacity-0 -translate-y-6 scale-y-90 pointer-events-none"
            }`}
          >
            <button
              onClick={() => {
                setShowMenu(false);
                // navigate("/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
            >
              <FaUser className="text-blue-600" />
              <span>View Profile</span>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100 transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;