import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaPhone,
  FaPlay,
  FaRupeeSign,
  FaUserCircle,
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

  const departureTime = new Date(
    ride.departureTime
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl shadow-2xl text-white overflow-hidden">

      <div className="p-8">

        {/* Header */}

        {ride.status === "AVAILABLE" ? (

  <div className="flex justify-between items-center">

    <div>

      <p className="uppercase tracking-widest text-green-100 text-xs font-semibold">
        ACTIVE RIDE
      </p>

      <h2 className="text-3xl font-bold mt-1">
        Ready to Go 🚀
      </h2>

    </div>

    <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">

      <FaMotorcycle size={28} />

    </div>

  </div>

) : (

  <div className="flex justify-between items-center">

    <div className="flex items-center gap-4">

      {ride.passengerProfile?.profilePictureUrl ? (

        <img
          src={`http://localhost:8082${ride.passengerProfile.profilePictureUrl}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-white"
        />

      ) : (

        <FaUserCircle
          size={64}
          className="text-white"
        />

      )}

      <div>

        <p className="uppercase tracking-widest text-green-100 text-xs font-semibold">
          PASSENGER
        </p>

        <h2 className="text-2xl font-bold">

          {ride.passengerProfile?.firstName}{" "}
          {ride.passengerProfile?.lastName}

        </h2>

        <p className="text-green-100">

          {ride.passengerProfile?.phoneNumber}

        </p>

      </div>

    </div>

    <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">

      <FaMotorcycle size={28} />

    </div>

  </div>

)}

        {/* Route */}

        <div className="mt-8">

          {/* Pickup */}

          <div className="flex gap-4">

            <div className="mt-1">

              <div className="h-3 w-3 rounded-full bg-white"></div>

            </div>

            <div>

              <p className="text-green-100 text-sm">
                Pickup
              </p>

              <h3 className="font-semibold text-lg">
                {ride.source.address}
              </h3>

            </div>

          </div>

          {/* Connector */}

          <div className="ml-[5px] h-8 border-l-2 border-dashed border-white/70"></div>

          {/* Destination */}

          <div className="flex gap-4">

            <FaMapMarkerAlt
              className="mt-1"
              size={14}
            />

            <div>

              <p className="text-green-100 text-sm">
                Destination
              </p>

              <h3 className="font-semibold text-lg">
                {ride.destination.address}
              </h3>

            </div>

          </div>

        </div>

        {/* Ride Details */}

        <div className="grid grid-cols-3 gap-4 mt-10">

          <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-md">

            <p className="text-xs text-green-100">
              Departure
            </p>

            <h4 className="text-xl font-bold mt-1">
              {departureTime}
            </h4>

          </div>

          <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-md">

            <p className="text-xs text-green-100">
              Price
            </p>

            <h4 className="text-xl font-bold mt-1 flex items-center gap-1">

              <FaRupeeSign />

              {ride.price}

            </h4>

          </div>

          <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-md">

            <p className="text-xs text-green-100">
              Status
            </p>

            <h4 className="text-lg font-bold mt-1">
              {ride.status}
            </h4>

          </div>

        </div>

        {/* Button */}
        <div className="flex gap-3 mt-8">

  <button
    onClick={onStartRide}
    className="flex-1 bg-white text-green-700 hover:bg-green-50 rounded-2xl py-4 font-semibold flex justify-center items-center gap-3"
  >

    <FaPlay />

    Start Ride

    <FaArrowRight />

  </button>

  {ride.status === "AVAILABLE" ? (

    <button
      onClick={onCancelRide}
      className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 font-semibold"
    >
      Cancel Ride
    </button>

  ) : (

    <button
      onClick={() =>
        window.open(
          `tel:${ride.passengerProfile?.phoneNumber}`
        )
      }
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold flex justify-center items-center gap-2"
    >

      <FaPhone />

      Call Passenger

    </button>

  )}

</div>

      </div>

    </div>
  );
}

export default YourRideCard;