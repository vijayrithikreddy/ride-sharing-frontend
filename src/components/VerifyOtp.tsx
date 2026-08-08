import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaMotorcycle, FaShieldAlt, FaRoute } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import * as AuthService from "../service/AuthService";
import doodleBg from "../images/rideshare-doodle-bg.png";

function VerifyOtp() {
  const { email } = useParams<{ email: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email) {
      setError("Email is missing.");
      return;
    }

    const otpCode = otp.join("");

    try {
      setLoading(true);
      setError("");

      await AuthService.verifyOtp(email, otpCode);

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;

    try {
      // Uncomment after creating the backend API
      // await AuthService.resendOtp(email);

      setTimeLeft(120);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setError("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section — Doodle Hero */}
      <div className="hidden lg:flex w-full lg:w-[58%] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 justify-center items-center relative overflow-hidden">
        {/* Doodle background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${doodleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Decorative blur circles */}
        <div className="absolute top-[-80px] left-[-80px] w-64 h-64 bg-blue-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-blue-400/15 rounded-full blur-2xl" />

        <div className="relative z-10 text-center px-10 max-w-lg">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
            <FaMotorcycle className="text-white text-2xl" />
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
            Ride Share
          </h1>

          <p className="text-blue-100 mt-4 text-lg leading-relaxed">
            Share motorcycle rides with daily commuters. Split costs, skip traffic, and travel smarter.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15 text-white text-sm">
              <FaShieldAlt className="text-blue-200 text-xs" />
              Verified Riders
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15 text-white text-sm">
              <FaRoute className="text-blue-200 text-xs" />
              Smart Routes
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15 text-white text-sm">
              <FaMotorcycle className="text-blue-200 text-xs" />
              Moto Pooling
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-10 pt-8 border-t border-white/15">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">10K+</p>
              <p className="text-blue-200 text-xs uppercase tracking-wider mt-1">Riders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-blue-200 text-xs uppercase tracking-wider mt-1">Rides</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">4.9★</p>
              <p className="text-blue-200 text-xs uppercase tracking-wider mt-1">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[42%] bg-gray-50 flex justify-center items-center min-h-screen lg:min-h-0 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile-only branding */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
              <FaMotorcycle className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-blue-600">Ride Share</h2>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Verify OTP
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-blue-600">
              {email}
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/60 flex flex-col gap-6 border border-gray-100">

              {/* 6 Digit OTP Inputs */}
              <div className="flex justify-center gap-2.5 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-11 h-12 sm:w-12 sm:h-14 border border-gray-200 rounded-xl text-center text-xl font-bold bg-gray-50 text-gray-900 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm"
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              {/* Timer / Resend & Change Email controls */}
              <div className="flex justify-between items-center text-sm pt-1">
                {timeLeft > 0 ? (
                  <p className="text-gray-500">
                    Resend OTP in{" "}
                    <span className="font-semibold text-blue-600">
                      {String(minutes).padStart(2, "0")}:
                      {String(seconds).padStart(2, "0")}
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
                  >
                    Resend OTP
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Change Email
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={otp.includes("") || loading}
                className="bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <>
                    Verify & Proceed <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;