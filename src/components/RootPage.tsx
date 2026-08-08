import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMotorcycle,
  FaGasPump,
  FaClock,
  FaUserFriends,
  FaShieldAlt,
  FaLeaf,
  FaArrowRight,
  FaCheckCircle,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import doodleBg from "../images/rideshare-doodle-bg.png";

function RootPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 flex flex-col justify-between">
      {/* ===== 1. Public Navbar ===== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
            <FaMotorcycle className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              Ride Share
            </h1>
            <p className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase mt-0.5">
              Moto Pooling
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#why-pooling" className="hover:text-blue-600 transition-colors">
            Why Bike Pooling
          </a>
          <a href="#benefits" className="hover:text-blue-600 transition-colors">
            Mutual Benefits
          </a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#safety" className="hover:text-blue-600 transition-colors">
            Safety
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center gap-1.5"
          >
            <FaSignInAlt className="text-xs text-blue-600" />
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <FaUserPlus className="text-xs" />
            Sign Up
          </button>
        </div>
      </nav>

      {/* ===== 2. Hero Section ===== */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden py-16 lg:py-24 px-6 lg:px-12">
        {/* Doodle Background Layer */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${doodleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Blur accent orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-blue-100 mb-6">
            <FaMotorcycle className="text-xs" /> Smart Motorcycle Ride Sharing
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Share the Bike. Split the Fuel. <br className="hidden sm:block" />
            <span className="text-blue-200">Beat the City Traffic.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
            A motorcycle pooling platform created for daily commuters, students, and office workers. Offer your pillion seat or grab a ride to save money, commute faster, and meet people going your way.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-extrabold text-base rounded-2xl hover:bg-blue-50 active:scale-95 shadow-xl shadow-blue-900/30 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Sharing Rides <FaArrowRight className="text-sm" />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              Log In to Account
            </button>
          </div>

          {/* Quick Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/15">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">50%</p>
              <p className="text-xs text-blue-200 mt-1">Lower Travel Cost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">2x Faster</p>
              <p className="text-xs text-blue-200 mt-1">Commute Through Traffic</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-blue-200 mt-1">Verified Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0 Detour</p>
              <p className="text-xs text-blue-200 mt-1">Same Daily Routes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Mutual Benefits Grid ===== */}
      <section id="benefits" className="py-16 sm:py-24 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Mutual Benefit Model
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
            Why Motorcycle Ride Sharing Works
          </h2>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            Both Bike Owners (Riders) and Passengers win on every single commute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaGasPump />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Split Fuel Expenses</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Riders earn back petrol money on routes they already take, while Passengers travel at a fraction of auto or taxi costs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaClock />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Beat City Traffic</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Motorcycles zip through gridlocked peak-hour traffic easily, saving up to 45 minutes on every daily journey.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaUserFriends />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Social Commuting</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connect with fellow students, office colleagues, and commuters heading in your exact direction.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaLeaf />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Greener Cities</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Fewer single-occupancy vehicles on the road means reduced carbon emissions and cleaner air for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. How It Works ===== */}
      <section id="how-it-works" className="bg-slate-100/70 py-16 sm:py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900">How Ride Share Works</h2>
            <p className="text-gray-500 text-sm mt-1">Simple 3-step process for both Riders and Passengers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rider Flow */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                  <FaMotorcycle />
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Bike Owners (Riders)</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-gray-600"><strong>Post Your Ride:</strong> Enter your daily route (e.g. Home to College/Office) and start time.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-gray-600"><strong>Accept Requests:</strong> Accept match requests from verified commuters along your path.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <p className="text-xs text-gray-600"><strong>Ride & Split Cost:</strong> Pick up passenger, ride together, and split petrol expenses.</p>
                </div>
              </div>
            </div>

            {/* Passenger Flow */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
                  <FaUserFriends />
                </div>
                <h3 className="text-xl font-bold text-gray-900">For Passengers</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-gray-600"><strong>Search Destination:</strong> Enter where you want to go and find riders on that route.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-gray-600"><strong>Request Seat:</strong> Send a ride request to riders offering pillion seats.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <p className="text-xs text-gray-600"><strong>Hop On & Save:</strong> Meet at pickup point, arrive fast, and pay minimal fare.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. Safety First ===== */}
      <section id="safety" className="py-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
              <FaShieldAlt /> Safety & Verification
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Your Safety is Our Top Priority</h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-4">
              All commuters complete profile verification (email OTP & student/employee organization checks). Live ride monitoring and user rating systems ensure a safe community.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-blue-200">
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-400" /> OTP Verification</span>
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-400" /> Community Ratings</span>
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-400" /> Live GPS Ride Details</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-blue-900 font-extrabold px-6 py-3.5 rounded-2xl hover:bg-blue-50 active:scale-95 transition-all flex-shrink-0 text-sm shadow-md"
          >
            Join Verified Community
          </button>
        </div>
      </section>

      {/* ===== 6. CTA Footer Banner ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <FaMotorcycle />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Ride Share</span>
          </div>

          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Ride Share — Motorcycle Pooling Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigate("/login")} className="hover:text-white transition">Login</button>
            <span>•</span>
            <button onClick={() => navigate("/signup")} className="hover:text-white transition">Sign Up</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RootPage;
