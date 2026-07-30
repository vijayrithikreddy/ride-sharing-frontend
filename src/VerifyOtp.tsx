import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function VerifyOtp() {
  const { email } = useParams();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Convert seconds to MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Focus first input on page load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only one digit
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    console.log("Email:", email);
    console.log("OTP:", otpCode);

    // TODO:
    // Call Verify OTP API here
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to:", email);

    // TODO:
    // Call Resend OTP API here

    // Restart timer
    setTimeLeft(120);

    // Clear OTP boxes
    setOtp(["", "", "", "", "", ""]);

    // Focus first box
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-[60%] bg-blue-600 flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Ride Share</h1>
          <p className="text-white mt-2">
            Join daily commuters and share rides safely.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[40%] bg-gray-50 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Verify OTP</h1>

            <p className="text-gray-500 mt-2">
              We've sent a 6-digit code to{" "}
              <span className="font-semibold text-black">{email}</span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-6"
          >
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              ))}
            </div>

            {/* Timer / Resend */}
            <div className="flex justify-between">
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
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
              <h5 className="font-medium text-black cursor-pointer" onClick={() => navigate("/signup")}>Change email address</h5>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={otp.includes("")}
              className="bg-blue-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => navigate("/")}
            >
              Verify & Proceed
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;