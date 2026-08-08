import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RidePreviewMap from "./RidePreviewMap";
import RideCard from "./RideCard";
import NavBar from "./NavBar";
import type { RideSearchResponse } from "../interfaces/RideSearchResponse";
import * as RideRequestService from "../service/RideRequestService";
import type { CreatePassengerRideRequest } from "../interfaces/CreatePassengerRideRequest";
import { FaArrowRight, FaArrowLeft, FaRoute, FaSearch, FaCheckCircle } from "react-icons/fa";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const { rides = [], searchRequest } = (location.state || {}) as {
    rides: RideSearchResponse[];
    searchRequest: CreatePassengerRideRequest;
  };

  const [selectedRide, setSelectedRide] = useState<RideSearchResponse | null>(null);
  const [requestedRideIds, setRequestedRideIds] = useState<number[]>([]);

  const handleRequestRide = async (ride: RideSearchResponse) => {
    try {
      await RideRequestService.requestRide({
        rideId: ride.rideId,
        source: searchRequest.source,
        destination: searchRequest.destination,
        passengerEncodedPolyline: searchRequest.passengerEncodedPolyline,
        departureTime: searchRequest.departureTime,
        matchPercentage: ride.matchPercentage,
        ridePrice: ride.price,
      });

      setRequestedRideIds((prev) => [...prev, ride.rideId]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <NavBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Matched Rides List */}
        <div className="w-full md:w-[440px] bg-white shadow-md border-r border-gray-200/80 flex flex-col justify-between overflow-y-auto flex-shrink-0">
          <div>
            {/* Header Bar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/home")}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 flex items-center justify-center transition-colors"
                  title="Back to Search"
                >
                  <FaArrowLeft className="text-xs" />
                </button>
                <div>
                  <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                    Matched Rides
                  </h1>
                  <p className="text-xs text-gray-500">
                    Select a ride to preview its route
                  </p>
                </div>
              </div>

              <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-extrabold">
                {rides.length} Found
              </span>
            </div>

            {/* Ride List or Empty State */}
            <div className="p-4 space-y-4">
              {rides.length === 0 ? (
                <div className="py-16 px-4 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <FaSearch size={28} />
                  </div>
                  <h2 className="text-base font-bold text-gray-800">No Matching Rides Found</h2>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    There are currently no published rides along your route. Try searching with a different departure time.
                  </p>
                  <button
                    onClick={() => navigate("/home")}
                    className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <FaSearch className="text-xs" /> New Search
                  </button>
                </div>
              ) : (
                rides.map((ride) => (
                  <RideCard
                    key={ride.rideId}
                    ride={ride}
                    expanded={selectedRide?.rideId === ride.rideId}
                    requestStatus={
                      requestedRideIds.includes(ride.rideId) ? "PENDING" : undefined
                    }
                    onRequestRide={handleRequestRide}
                    onClick={() => {
                      if (selectedRide?.rideId === ride.rideId) {
                        setSelectedRide(null);
                      } else {
                        setSelectedRide(ride);
                      }
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Route Map Preview */}
        <div className="flex-1 p-6 relative">
          {selectedRide && searchRequest ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full">
              <RidePreviewMap
                riderPolyline={selectedRide.encodedPolyline}
                passengerPolyline={searchRequest.passengerEncodedPolyline}
                pickup={searchRequest.source}
                destination={searchRequest.destination}
              />
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col justify-center items-center text-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                <FaRoute size={34} />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Route Map Preview
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
                Select any matched ride from the left list to compare your route with the rider's route.
              </p>
            </div>
          )}

          {/* Floating Request Sent Notification Toast */}
          {requestedRideIds.length > 0 && (
            <div className="fixed bottom-6 right-6 w-80 z-50 animate-bounceIn">
              <div className="bg-white rounded-2xl shadow-xl p-5 border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <FaCheckCircle size={20} />
                  <h3 className="text-base font-extrabold text-gray-900">
                    {requestedRideIds.length} Request{requestedRideIds.length > 1 ? "s" : ""} Sent!
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Your seat request has been sent to the rider. Track driver responses on your dashboard.
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all duration-200"
                >
                  Go To Dashboard <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;