import {
  FaCloudSun,
  FaRoad,
  FaTrafficLight,
  FaUsers,
} from "react-icons/fa";

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
    <div className="bg-white rounded-3xl shadow-xl p-6 h-full">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Ride Insights
      </h2>

      <div className="space-y-5">

        {/* Weather */}

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center">

            <FaCloudSun
              className="text-yellow-500"
              size={22}
            />

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Weather
            </p>

            <h3 className="font-semibold text-lg">
              {temperature}°C • {weather}
            </h3>

          </div>

        </div>

        {/* Distance */}

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <FaRoad
              className="text-blue-600"
              size={22}
            />

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Distance
            </p>

            <h3 className="font-semibold text-lg">
              {distance}
            </h3>

          </div>

        </div>

        {/* Traffic */}

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">

            <FaTrafficLight
              className="text-red-500"
              size={22}
            />

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Traffic
            </p>

            <h3 className="font-semibold text-lg">
              {trafficDelay}
            </h3>

          </div>

        </div>

        {/* Requests */}

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">

            <FaUsers
              className="text-green-600"
              size={22}
            />

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Ride Requests
            </p>

            <h3 className="font-semibold text-lg">
              {requests}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RideInsightsCard;