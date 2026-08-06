import { useEffect, useState } from "react";
import PendingRideRequest from "./PendingRideRequest";
import PassengerActiveRideCard from "./ActiveRideCard";
import RidePreviewMap from "./RidePreviewMap";
import * as RideRequestService from "../service/RideRequestService";
import WebSocketService from "../service/WebSocketService";
import type { RequestRideResponse } from "../interfaces/RequestRideResponse";
import { useNavigate } from "react-router-dom";

function PassengerDashboard() {
  const navigate = useNavigate();
    const [passengerRideRequests, setPassengerRideRequests] =
    useState<RequestRideResponse[]>([]);

  const [selectedRide, setSelectedRide] =
    useState<RequestRideResponse | null>(null);

  useEffect(() => {
    loadRideRequests();
  }, []);

  useEffect(() => {
    WebSocketService.connect();

    const passengerId =
      localStorage.getItem("AUTH_USER_ID");

    if (!passengerId) {
      console.error("Passenger ID not found");
      return;
    }

    WebSocketService.subscribe(
      `/topic/passenger/${passengerId}`,
      (event) => {
        console.log("Passenger Event:", event);

        switch (event.type) {
          case "REQUEST_ACCEPTED":
            setPassengerRideRequests((oldRequests) =>
              oldRequests.map((request) =>
                request.requestId ===
                event.payload.requestId
                  ? event.payload
                  : request
              )
            );
            break;

          case "REQUEST_REJECTED":
            setPassengerRideRequests((oldRequests) =>
              oldRequests.filter(
                (request) =>
                  request.requestId !==
                  event.payload.requestId
              )
            );
            break;
            case "RIDE_STARTED":
               navigate(`/live/${event.payload}`);
                break;

          default:
            console.log(
              "Unknown Event:",
              event.type
            );
        }
      }
    );
  }, []);

  const loadRideRequests = async () => {
    try {
      const response =
        await RideRequestService.getMyActiveRideRequests();

      setPassengerRideRequests(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(
      "Ride Requests Updated:",
      passengerRideRequests
    );
  }, [passengerRideRequests]);

  const pendingRequests =
    passengerRideRequests.filter(
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

  const cancelRequest = async (
    requestId: number
  ) => {
    try {
      await RideRequestService.cancelRideRequest(
        requestId
      );

      loadRideRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const contactDriver = () => {
    console.log("Contact Driver");
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* LEFT */}

      <div
  className={`transition-all duration-500 ease-in-out overflow-hidden ${
    acceptedRide
      ? "w-0 opacity-0"
      : "w-[430px] opacity-100"
  }`}
>
  <div className="h-full bg-white rounded-3xl shadow-xl overflow-y-auto">
    <div className="sticky top-0 bg-white z-20 p-6 border-b">
      <h1 className="text-2xl font-bold">
        Waiting For Driver Approval
      </h1>

      <p className="text-gray-500 mt-1">
        Your ride requests awaiting approval.
      </p>
    </div>

    <div className="p-4 space-y-4">
      {pendingRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No pending requests
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
      {/* RIGHT */}

<div
  className={`transition-all duration-500 p-6 ${
    acceptedRide ? "w-full" : "flex-1"
  }`}
>        <div className="flex flex-col gap-6 h-full">

          {/* Active Ride */}

<div
  className={`transition-all duration-500 ${
    acceptedRide
      ? "h-[340px]"
      : "h-[280px]"
  }`}
>            {acceptedRide ? (
              <PassengerActiveRideCard
                ride={acceptedRide}
                onContactRider={contactDriver}
                onCancelRide={() =>
                  cancelRequest(
                    acceptedRide.requestId
                  )
                }
              />
            ) : (
              <div className="h-full bg-white rounded-3xl shadow-xl flex justify-center items-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">
                    No Active Ride
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Once a driver accepts your request,
                    it will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* MAP */}

<div
  className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${
    acceptedRide
      ? "h-[calc(100vh-420px)]"
      : "flex-1"
  }`}
>            {selectedRide ? (
              <RidePreviewMap
                riderPolyline={
                  selectedRide.riderEncodedPolyline
                }
                passengerPolyline={
                  selectedRide.passengerEncodedPolyline
                }
                pickup={selectedRide.source}
                destination={
                  selectedRide.destination
                }
              />
            ) : (
              <div className="h-full flex flex-col justify-center items-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex justify-center items-center">
                  <span className="text-5xl">
                    🗺️
                  </span>
                </div>

                <h2 className="text-3xl font-bold mt-6">
                  Ride Preview
                </h2>

                <p className="text-gray-500 mt-3">
                  Select a pending request to
                  preview its route.
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