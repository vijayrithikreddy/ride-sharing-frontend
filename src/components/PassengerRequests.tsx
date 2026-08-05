import type { Dispatch, SetStateAction } from "react";
import type { RideRequestResponse } from "../interfaces/RideRequestResponse";
import PassengerRequestCard from "./PassengerRequestCard";

interface RideRequestsProps {
  requests: RideRequestResponse[];

  selectedRequest: RideRequestResponse | null;

  setSelectedRequest: Dispatch<
    SetStateAction<RideRequestResponse | null>
  >;

  onAccept: (requestId: number) => void;

  onReject: (requestId: number) => void;
}

function PassengerRequests({
  requests,
  selectedRequest,
  setSelectedRequest,
  onAccept,
  onReject,
}: RideRequestsProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 h-fit">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Ride Requests
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review passenger requests for your ride.
          </p>

        </div>

        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">

          {requests.length} Pending

        </div>

      </div>

      {/* Empty State */}

      {requests.length === 0 ? (

        <div className="h-64 flex flex-col justify-center items-center">

          <img
            src="/empty-state.svg"
            alt=""
            className="w-28 opacity-50"
          />

          <h3 className="text-xl font-semibold text-gray-700 mt-5">

            No Requests Yet

          </h3>

          <p className="text-gray-500 mt-2">

            Passenger requests will appear here.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {requests.map((request) => (

            <PassengerRequestCard
              key={request.requestId}
              request={request}
              expanded={
                selectedRequest?.requestId ===
                request.requestId
              }
              onClick={() => {

                if (
                  selectedRequest?.requestId ===
                  request.requestId
                ) {

                  setSelectedRequest(null);

                } else {

                  setSelectedRequest(request);

                }

              }}
              onAccept={onAccept}
              onReject={onReject}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default PassengerRequests;