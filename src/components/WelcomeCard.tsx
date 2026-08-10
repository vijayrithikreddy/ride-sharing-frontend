import React from "react";
import { FaArrowRight, FaMotorcycle } from "react-icons/fa";

interface WelcomeProps {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

type Step = "welcome" | "publish";

function WelcomeCard({ setStep }: WelcomeProps) {
  return (
    <div className="absolute top-6 left-6 z-10 w-[calc(100%-3rem)] max-w-md animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-gray-900/10 p-6 sm:p-7 border border-gray-100">
        {/* Icon & Mode Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <FaMotorcycle size={24} />
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Rider Mode
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-900">
          Ready to Share Your Ride? 👋
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Publish your motorcycle commute route, offer your spare seat to nearby commuters, and split petrol costs easily.
        </p>

        {/* Button */}
        <button
          onClick={() => setStep("publish")}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
        >
          Publish Ride <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

export default WelcomeCard;
