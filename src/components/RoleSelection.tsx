import React, { useContext, useState } from "react";
import { FaMotorcycle, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as UserService from "../service/UserService";
import { AuthContext } from "../context/AuthContext";

function RoleSelection() {
  let {setUserType} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRoleSelection = async (
    role: "RIDER" | "PASSENGER"
  ) => {
    try {
      setLoading(true);

      await UserService.updateUserMode(role);
      setUserType(role);


      if (role === "RIDER") {
        navigate("/home");
      } else {
        navigate("/passengerhome");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            How would you like to continue?
          </h1>

          <p className="mt-3 text-gray-500">
            Choose your preferred mode. You can always switch later from your profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Rider */}

          <div
            onClick={() => handleRoleSelection("RIDER")}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer p-10 border hover:border-green-500"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <FaMotorcycle
                className="text-green-600"
                size={36}
              />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Continue as Rider
            </h2>

            <p className="text-gray-500 leading-7">
              Publish rides, share your journey with fellow students,
              earn money on your trips, and help reduce traffic by offering seats.
            </p>

            <button
              disabled={loading}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              Continue as Rider
            </button>
          </div>

          {/* Passenger */}

          <div
            onClick={() => handleRoleSelection("PASSENGER")}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer p-10 border hover:border-blue-500"
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <FaUserFriends
                className="text-blue-600"
                size={36}
              />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Continue as Passenger
            </h2>

            <p className="text-gray-500 leading-7">
              Search for rides posted by nearby riders, request a seat,
              travel conveniently, and split travel costs with others.
            </p>

            <button
              disabled={loading}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Continue as Passenger
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RoleSelection;