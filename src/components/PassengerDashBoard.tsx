import { useEffect, useState } from "react";
import PendingRideRequest from "./PendingRideRequest";
import PassengerActiveRideCard from "./ActiveRideCard";
import RidePreviewMap from "./RidePreviewMap";
import * as RideRequestService from "../service/RideRequestService";
import WebSocketService from "../service/WebSocketService";
import type { RequestRideResponse } from "../interfaces/RequestRideResponse";
import { useNavigate } from "react-router-dom";
import { FaClock, FaRoute, FaCheckCircle, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

function PassengerDashboard() {
  const navigate = useNavigate();
  const [passengerRideRequests, setPassengerRideRequests] = useState<
    RequestRideResponse[]
  >([]);

  const [selectedRide, setSelectedRide] = useState<
    RequestRideResponse | null
  >(null);

  useEffect(() => {
    loadRideRequests();
  }, []);

  useEffect(() => {
    WebSocketService.connect();

    const passengerId = localStorage.getItem("AUTH_USER_ID");

    if (!passengerId) {
      console.error("Passenger ID not found");
      return;
    }

    WebSocketService.subscribe(
      `/topic/passenger/${passengerId}`,
      (event) => {
        switch (event.type) {
          case "REQUEST_ACCEPTED":
            toast.success("Your ride request was accepted by the rider!");
            setPassengerRideRequests((oldRequests) =>
              oldRequests.map((request) =>
                request.requestId === event.payload.requestId
                  ? event.payload
                  : request
              )
            );
            break;

          case "REQUEST_REJECTED":
            toast.error("Your ride request was declined.");
            setPassengerRideRequests((oldRequests) =>
              oldRequests.filter(
                (request) => request.requestId !== event.payload.requestId
              )
            );
            break;
          case "RIDE_STARTED":
            navigate(`/live/${event.payload}`);
            break;

          default:
            break;
        }
      }
    );
  }, []);

  const loadRideRequests = async () => {
    try {
      const response = await RideRequestService.getMyActiveRideRequests();
      setPassengerRideRequests(response);
    } catch (err) {
      console.error(err);
    }
  };

  const pendingRequests = passengerRideRequests.filter(
    (request) => request.status === "PENDING"
  );

  const acceptedRide =
    passengerRideRequests.find(
      (request) => request.status === "ACCEPTED"
    ) ?? null;

  useEffect(() => {
    if (acceptedRide) {
      setSelectedRide(acceptedRide);
    }
  }, [acceptedRide]);

  const cancelRequest = async (requestId: number) => {
    try {
      await RideRequestService.cancelRideRequest(requestId);
      loadRideRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const contactDriver = () => {};

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex overflow-hidden">
      {/* LEFT COLUMN: Pending Ride Requests */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden flex-shrink-0 ${
          acceptedRide ? "w-0 opacity-0" : "w-full md:w-[440px] opacity-100 border-r border-gray-200/80"
        }`}
      >
        <div className="h-full bg-white flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {pendingRequests.length} Pending
                </span>
              </div>

              <h1 className="text-xl font-extrabold text-gray-900 mt-2">
                Waiting For Approval
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                Your ride requests awaiting driver confirmation.
              </p>
            </div>

            <div className="p-4 space-y-3.5">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <FaClock size={28} />
                  </div>
                  <h3 className="text-base font-bold text-gray-800">
                    No Pending Requests
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Search for rides on your route to request a seat from a rider.
                  </p>
                  <button
                    onClick={() => navigate("/home")}
                    className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <FaSearch className="text-xs" /> Search Rides
                  </button>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <PendingRideRequest
                    key={request.requestId}
                    ride={request}
                    onCancel={cancelRequest}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Active Ride & Route Preview Map */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col gap-6 h-full max-w-6xl mx-auto">
          {/* Active Accepted Ride Card */}
          {acceptedRide ? (
            <PassengerActiveRideCard
              ride={acceptedRide}
              onContactRider={contactDriver}
              onCancelRide={() => cancelRequest(acceptedRide.requestId)}
            />
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">No Accepted Ride Yet</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Once a driver accepts your request, details will appear here.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/home")}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
              >
                Search Rides
              </button>
            </div>
          )}

          {/* Map Preview */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex-1 min-h-[450px]">
            {selectedRide ? (
              <RidePreviewMap
                riderPolyline={selectedRide.riderEncodedPolyline}
                passengerPolyline={selectedRide.passengerEncodedPolyline}
                pickup={selectedRide.source}
                destination={selectedRide.destination}
              />
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                  <FaRoute size={34} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Route Map Preview
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
                  Select a pending request from the left list to preview its route overlay on the map.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerDashboard;