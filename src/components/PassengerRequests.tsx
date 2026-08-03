import {
  FaCheck,
  FaMapMarkerAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

export interface RideRequest {
  requestId: number;
  passengerName: string;
  pickupAddress: string;
  destinationAddress: string;
  matchPercentage: number;
}

interface RideRequestsProps {
  requests: RideRequest[];

  onAccept: (requestId: number) => void;

  onReject: (requestId: number) => void;
}

function PassengerRequests({
  requests,
  onAccept,
  onReject,
}: RideRequestsProps) {

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-gray-800">
          Ride Requests
        </h2>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {requests.length} Pending
        </span>

      </div>

      {requests.length === 0 ? (

        <div className="py-16 text-center">

          <FaUserCircle
            className="mx-auto text-gray-300"
            size={70}
          />

          <h3 className="mt-4 text-xl font-semibold text-gray-700">
            No Ride Requests
          </h3>

          <p className="text-gray-500 mt-2">
            Passenger requests will appear here.
          </p>

        </div>

      ) : (

        <div className="mt-6 space-y-5">

          {requests.map((request) => (

            <div
              key={request.requestId}
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >

              <div className="flex justify-between">

                <div className="flex gap-4">

                  <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">

                    <FaUserCircle
                      size={34}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {request.passengerName}
                    </h3>

                    <p className="text-sm text-green-600 font-medium">
                      {request.matchPercentage}% Route Match
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                <div className="flex gap-3">

                  <FaMapMarkerAlt className="text-green-600 mt-1"/>

                  <div>

                    <p className="text-xs text-gray-500">
                      Pickup
                    </p>

                    <p className="font-medium">
                      {request.pickupAddress}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <FaMapMarkerAlt className="text-red-500 mt-1"/>

                  <div>

                    <p className="text-xs text-gray-500">
                      Destination
                    </p>

                    <p className="font-medium">
                      {request.destinationAddress}
                    </p>

                  </div>

                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    onAccept(request.requestId)
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
                >

                  <FaCheck/>

                  Accept

                </button>

                <button
                  onClick={() =>
                    onReject(request.requestId)
                  }
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
                >

                  <FaTimes/>

                  Reject

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default PassengerRequests;