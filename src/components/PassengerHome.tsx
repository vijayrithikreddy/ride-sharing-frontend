
import React from "react";
import NavBar from "./NavBar";
import { FaArrowRight } from "react-icons/fa";

function PassengerHome() {
  const inputStyle =
    "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Greeting */}
      <div className="px-12 py-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Hello, Vijay 👋
        </h2>

        <p className="text-gray-600 mt-2">
          Find a ride going your way and travel together.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-8 px-12 pb-10">

        {/* Left Section */}
        <div className="space-y-6">

          {/* Request Ride Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold text-gray-900">
              Request a Ride
            </h2>

            <p className="text-gray-500 mt-1 mb-6">
              Search for rides that match your destination.
            </p>

            <form className="space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Pickup Location
                </label>

                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Destination
                </label>

                <input
                  type="text"
                  placeholder="Enter destination"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Departure Time
                </label>

                <input
                  type="time"
                  className={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                Search Rides
                <FaArrowRight />
              </button>

            </form>
          </div>

          {/* Requested Rides */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Requested Rides
              </h2>

              <button className="text-blue-600 text-sm font-medium hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      MLR Institute ➜ Gachibowli
                    </h3>

                    <p className="text-sm text-gray-500">
                      Today • 5:30 PM
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Pending
                  </span>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Kukatpally ➜ Hitech City
                    </h3>

                    <p className="text-sm text-gray-500">
                      Tomorrow • 9:00 AM
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Accepted
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Section - Map */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden min-h-[650px] flex items-center justify-center">

          <p className="text-gray-500 text-lg">
            Available rides will be displayed on the map.
          </p>

        </div>

      </div>
    </div>
  );
}

export default PassengerHome;
