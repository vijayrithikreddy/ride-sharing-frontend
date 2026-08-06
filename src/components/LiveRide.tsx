import { FaFlagCheckered, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LiveRideMap from "./LiveRideMap";
import * as RideService from "../service/RideService";
import type { LiveRideResponse } from "../interfaces/LiveRideResponse";

function LiveRide() {
  const { rideId } = useParams();

  const [ride, setRide] = useState<LiveRideResponse | null>(null);

  const userType = localStorage.getItem("userType");

  const isDriver = userType === "RIDER";

  useEffect(() => {
    if (!rideId) return;

    loadRide();
  }, [rideId]);

  const loadRide = async () => {
    try {
      const response = await RideService.getLiveRide(
        Number(rideId)
      );

      setRide(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!ride) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Ride...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Header */}

      <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Live Ride
          </h1>

          <p className="text-gray-500 mt-1">
            Ride #{ride.rideId}
          </p>

        </div>

        <span className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
          {ride.rideStatus}
        </span>

      </div>

      {/* Map */}

      <div className="flex-1 relative">

        <LiveRideMap
          riderPolyline={ride.riderEncodedPolyline}
          passengerPolyline={ride.passengerEncodedPolyline}
          pickup={ride.source}
          destination={ride.destination}
        />

        {/* Bottom Card */}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl">

          <div className="bg-white rounded-3xl shadow-2xl p-6">

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Person */}

              <div>

                <p className="text-gray-500 text-sm">
                  {isDriver ? "Passenger" : "Driver"}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {isDriver
                    ? ride.passengerName
                    : ride.driverName}
                </h2>

                <p className="text-gray-500 mt-1">
                  {isDriver
                    ? ride.passengerPhoneNumber
                    : ride.driverPhoneNumber}
                </p>

                <button className="mt-5 flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">

                  <FaPhoneAlt />

                  Call

                </button>

              </div>

              {/* Ride Stats */}

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-gray-100 rounded-xl p-4 text-center">

                  <p className="text-sm text-gray-500">
                    ETA
                  </p>

                  <h3 className="text-xl font-bold">
                    --
                  </h3>

                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">

                  <p className="text-sm text-gray-500">
                    Distance
                  </p>

                  <h3 className="text-xl font-bold">
                    --
                  </h3>

                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">

                  <p className="text-sm text-gray-500">
                    Speed
                  </p>

                  <h3 className="text-xl font-bold">
                    --
                  </h3>

                </div>

              </div>

              {/* Actions */}

              <div className="flex items-center justify-end">

                {isDriver ? (

                  <button
                    className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold"
                  >

                    <FaFlagCheckered />

                    Complete Ride

                  </button>

                ) : (

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold"
                  >
                    Cancel Ride
                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LiveRide;