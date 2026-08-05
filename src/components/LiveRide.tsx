import {
  FaMapMarkerAlt,
  FaMotorcycle,
  FaPhoneAlt,
  FaRupeeSign,
  FaRoute,
} from "react-icons/fa";
import GoogleMapView from "../components/GoogleMapView";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LiveRide() {

  const { userType } = useContext(AuthContext);

  const isDriver = userType === "RIDER";

  return (

    <div className="h-screen flex flex-col">

      <NavBar />

      <div className="relative flex-1">

        <GoogleMapView />

        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-green-600 font-semibold">
                Ride In Progress
              </p>

              <h2 className="text-2xl font-bold">
                12 Minutes Remaining
              </h2>

            </div>

            <div className="h-16 w-16 rounded-full bg-blue-100 flex justify-center items-center">

              <FaMotorcycle
                className="text-blue-600"
                size={28}
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">

            <div>

              <p className="text-gray-500">
                Driver
              </p>

              <h3 className="text-xl font-semibold">
                Rahul Kumar
              </h3>

              <p className="text-gray-500">
                +91 9876543210
              </p>

            </div>

            <div>

              <p className="text-gray-500">
                Vehicle
              </p>

              <h3 className="font-semibold">
                Honda Activa
              </h3>

              <p className="text-gray-500">
                TS09AB1234
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-6">

            <div className="flex gap-3">

              <FaMapMarkerAlt className="text-green-600 mt-1"/>

              <div>

                <p className="text-sm text-gray-500">
                  Pickup
                </p>

                <p className="font-medium">
                  MLR Institute of Technology
                </p>

              </div>

            </div>

            <div className="border-l ml-2 h-6"></div>

            <div className="flex gap-3">

              <FaMapMarkerAlt className="text-red-500 mt-1"/>

              <div>

                <p className="text-sm text-gray-500">
                  Destination
                </p>

                <p className="font-medium">
                  Madhapur
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-gray-100 rounded-xl p-4">

              <FaRupeeSign className="text-green-600"/>

              <p className="text-sm text-gray-500 mt-2">
                Fare
              </p>

              <p className="font-bold">
                ₹80
              </p>

            </div>

            <div className="bg-gray-100 rounded-xl p-4">

              <FaRoute className="text-blue-600"/>

              <p className="text-sm text-gray-500 mt-2">
                Distance Left
              </p>

              <p className="font-bold">
                3.4 km
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-3">

              <FaPhoneAlt />

              Contact

            </button>

            {isDriver ? (

              <button className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl">

                Complete Ride

              </button>

            ) : (

              <button className="bg-gray-200 hover:bg-gray-300 py-4 rounded-xl">

                Share Ride

              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default LiveRide;