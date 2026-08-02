import React from "react";
import { FaMotorcycle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function RiderHome() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      <NavBar />

      <div className="relative flex-1">

        {/* Google Maps */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">

          <div className="text-center">

            <h2 className="text-3xl font-bold text-gray-700">
              Google Maps
            </h2>

            <p className="text-gray-500 mt-2">
              Your current location and nearby passengers will appear here.
            </p>

          </div>

        </div>

        {/* Floating Publish Card */}

        <div className="absolute top-8 left-8 w-[420px]">

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

              <FaMotorcycle
                size={30}
                className="text-blue-600"
              />

            </div>

            <h1 className="text-3xl font-bold mt-6 text-gray-900">
              Hello Vijay 👋
            </h1>

            <p className="text-gray-500 mt-3 leading-7">
              Ready to share your ride today?
              Publish your trip and help fellow students
              travelling on the same route.
            </p>

            <div className="mt-8 space-y-3">

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Active Ride
                </span>

                <span className="font-semibold text-gray-900">
                  None
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Pending Requests
                </span>

                <span className="font-semibold text-gray-900">
                  0
                </span>

              </div>

            </div>

            <button
              onClick={() => navigate("/publishride")}
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3"
            >
              Publish Ride

              <FaArrowRight />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RiderHome;