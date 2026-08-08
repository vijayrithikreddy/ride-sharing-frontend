import { useEffect, useState } from "react";
import * as RideService from "../service/RideService";
import type { RideHistory as RideHistoryType } from "../interfaces/RideHistory";
import RideHistoryCard from "../components/RideHistoryCard";
import { FaRoute, FaCheckCircle, FaCalendarCheck } from "react-icons/fa";

function RideHistory() {
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState<RideHistoryType[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await RideService.getRideHistory();
      setRides(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 font-bold text-sm">Loading Ride History...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Rider History
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
              My Published Rides
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              View all rides you published and completed as a Rider.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-2xl border border-emerald-200 self-start sm:self-auto">
            <FaCheckCircle className="text-emerald-600" />
            <span className="text-sm font-extrabold">{rides.length} Rides Completed</span>
          </div>
        </div>

        {/* Rides List */}
        <div className="space-y-6">
          {rides.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <FaCalendarCheck size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">No completed rides yet</h2>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                Once you publish and complete rides, your ride history and fare summary will appear here.
              </p>
            </div>
          ) : (
            rides.map((ride) => <RideHistoryCard key={ride.rideId} ride={ride} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default RideHistory;