import type { Dispatch, SetStateAction } from "react";
import type { RideRequestResponse } from "../interfaces/RideRequestResponse";
import PassengerRequestCard from "./PassengerRequestCard";
import { FaUserFriends, FaInbox } from "react-icons/fa";

interface RideRequestsProps {
  requests: RideRequestResponse[];
  selectedRequest: RideRequestResponse | null;
  setSelectedRequest: Dispatch<SetStateAction<RideRequestResponse | null>>;
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
    <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaUserFriends className="text-blue-600 text-lg" /> Ride Requests
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Review passenger requests for your ride.
          </p>
        </div>

        <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-extrabold">
          {requests.length} Pending
        </span>
      </div>

      {/* Empty State */}
      {requests.length === 0 ? (
        <div className="py-12 px-4 flex flex-col justify-center items-center text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <FaInbox size={26} />
          </div>
          <h3 className="text-base font-bold text-gray-800">
            No Requests Yet
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">
            Passenger requests matching your route will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-1">
          {requests.map((request) => (
            <PassengerRequestCard
              key={request.requestId}
              request={request}
              expanded={selectedRequest?.requestId === request.requestId}
              onClick={() => {
                if (selectedRequest?.requestId === request.requestId) {
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