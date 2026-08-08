import { useContext, useEffect, useState } from "react";
import YourRideCard from "./YourRideCard";
import RideInsightsCard from "./RideInsightsCard";
import PassengerRequests from "./PassengerRequests";
import { RideContext } from "../context/RideContext";
import type { RideRequestResponse } from "../interfaces/RideRequestResponse";
import * as RideRequestService from "../service/RideRequestService";
import * as RideService from "../service/RideService";
import { FaRoute, FaMotorcycle, FaCalendarPlus } from "react-icons/fa";
import RidePreviewMap from "./RidePreviewMap";
import { useNavigate } from "react-router-dom";
import WebSocketService from "../service/WebSocketService";

function RiderDashboard() {
  const navigate = useNavigate();

  const { activeRide } = useContext(RideContext);
  const [requests, setRequests] = useState<RideRequestResponse[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<RideRequestResponse | null>(null);

  useEffect(() => {
    if (!activeRide) return;

    loadRequests();

    WebSocketService.connect();
    const driverId = localStorage.getItem("AUTH_USER_ID");

    if (driverId) {
      WebSocketService.subscribe(`/topic/driver/${driverId}`, (event) => {
        console.log("Driver Event:", event);

        switch (event.type) {
          case "RIDE_STARTED":
            navigate(`/live/${event.payload}`);
            break;
          default:
            console.log("Unknown Driver Event:", event.type);
        }
      });
    }

    WebSocketService.subscribe(
      `/topic/rides/${activeRide.rideId}/requests`,
      (message) => {
        console.log("WEBSOCKET JSON:", JSON.stringify(message, null, 2));
        setRequests((prev) => [...prev, message.payload]);
      }
    );

    return () => {
      WebSocketService.disconnect();
    };
  }, [activeRide]);

  const loadRequests = async () => {
    try {
      const response = await RideRequestService.getMyRideRequestsForDriver();
      setRequests(response);
    } catch (error) {
      console.error("Failed to load ride requests", error);
    }
  };

  const handleAccept = async (requestId: number) => {
    await RideRequestService.acceptRideRequest(requestId);
    window.location.reload();
  };

  const handleReject = async (requestId: number) => {
    await RideRequestService.rejectRideRequest(requestId);
  };

  // Empty state if no active ride published
  if (!activeRide) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-md w-full border border-gray-100">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <FaMotorcycle size={38} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            No Active Ride
          </h2>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            You don't have an active ride published right now. Publish a ride on your daily route to start receiving passenger requests.
          </p>

          <button
            onClick={() => navigate("/home")}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all duration-200"
          >
            <FaCalendarPlus className="text-xs" /> Publish a Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Rider Control Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Namaste, Rider 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Your ride is active and published. Manage incoming passenger requests below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
              Live & Accepting
            </span>
          </div>
        </div>

        {/* Top Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <YourRideCard
              ride={activeRide}
              onStartRide={async () => {
                await RideService.startRide();
                console.log("Start Ride");
              }}
              onCancelRide={async () => {
                await RideService.cancelRide();
                console.log("Cancel Ride");
              }}
            />
          </div>

          <RideInsightsCard
            temperature={30}
            weather="Sunny"
            distance="12 km"
            trafficDelay="+5 mins"
            requests={requests.length}
          />
        </div>

        {/* Bottom Section: Passenger Requests & Route Preview Map */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <PassengerRequests
              requests={requests}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </div>

          <div className="lg:col-span-3">
            {selectedRequest ? (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-[550px]">
                <RidePreviewMap
                  riderPolyline={activeRide.encodedPolyline}
                  passengerPolyline={selectedRequest.passengerEncodedPolyline}
                  pickup={selectedRequest.source}
                  destination={selectedRequest.destination}
                />
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 h-[550px] flex flex-col justify-center items-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                  <FaRoute size={34} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Preview Request Route
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
                  Select any passenger request from the left list to preview their route overlay on the map.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;