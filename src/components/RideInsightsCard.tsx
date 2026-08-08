import { FaCloudSun, FaRoad, FaTrafficLight, FaUsers } from "react-icons/fa";

interface RideInsightsCardProps {
  temperature: number;
  weather: string;
  distance: string;
  trafficDelay: string;
  requests: number;
}

function RideInsightsCard({
  temperature,
  weather,
  distance,
  trafficDelay,
  requests,
}: RideInsightsCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100 flex flex-col justify-between">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">
        Ride Insights
      </h2>

      <div className="space-y-4">
        {/* Weather */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
          <div className="h-11 w-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
            <FaCloudSun size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Weather
            </p>
            <h3 className="font-bold text-sm text-gray-900">
              {temperature}°C • {weather}
            </h3>
          </div>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
          <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <FaRoad size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Distance
            </p>
            <h3 className="font-bold text-sm text-gray-900">
              {distance}
            </h3>
          </div>
        </div>

        {/* Traffic */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
          <div className="h-11 w-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <FaTrafficLight size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Traffic Status
            </p>
            <h3 className="font-bold text-sm text-gray-900">
              {trafficDelay}
            </h3>
          </div>
        </div>

        {/* Requests */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
          <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <FaUsers size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Pending Requests
            </p>
            <h3 className="font-bold text-sm text-gray-900">
              {requests} {requests === 1 ? "Request" : "Requests"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideInsightsCard;