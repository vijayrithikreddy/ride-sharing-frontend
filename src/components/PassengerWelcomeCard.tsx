import React from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";

interface PassengerWelcomeCardProps {
  setStep: React.Dispatch<React.SetStateAction<"welcome" | "search">>;
}

function PassengerWelcomeCard({ setStep }: PassengerWelcomeCardProps) {
  return (
    <div className="absolute top-6 left-6 z-10 w-[calc(100%-3rem)] max-w-md animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-gray-900/10 p-6 sm:p-7 border border-gray-100">
        {/* Icon & Mode Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
            <FaSearch size={22} />
          </div>
          <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Passenger Mode
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-900">
          Looking for a Ride? 👋
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Search for bike rides shared by commuters along your route. Get to your destination quickly, safely, and affordably.
        </p>

        {/* Button */}
        <button
          onClick={() => setStep("search")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md shadow-blue-600/25 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
        >
          Search Ride <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

export default PassengerWelcomeCard;