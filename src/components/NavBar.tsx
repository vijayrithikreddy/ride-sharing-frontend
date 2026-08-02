import React from "react";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="bg-blue-600 h-18 shadow-lg flex items-center justify-between px-8">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <h1 className="text-white text-3xl font-bold cursor-pointer">
          RideShare
        </h1>

        <button className="text-white font-medium hover:text-blue-100 transition cursor-pointer hover:underline decoration-2 decoration-white underline-offset-4 transition duration-300">
          Home
        </button>

        <button className="text-white font-medium hover:text-blue-100 transition cursor-pointer hover:underline decoration-2 decoration-white underline-offset-4 transition duration-300">
          My Rides
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="bg-white text-blue-600 font-semibold px-6 py-1 rounded-lg hover:bg-blue-50 transition cursor-pointer">
          Switch to Driver
        </button>

        <button
          aria-label="Profile"
          className="text-white hover:text-blue-100 transition cursor-pointer"
        >
          <FaUserCircle size={38} />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;