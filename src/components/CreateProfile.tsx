import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import ProfileDetails from "./ProfileDetails";
import ProfileReview from "./ProfileReview";
import type { UserProfileDto } from "../interfaces/UserProfileDto";
import { updateProfileData } from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { FaMotorcycle, FaUser, FaIdCard, FaCheckCircle } from "react-icons/fa";
import doodleBg from "../images/rideshare-doodle-bg.png";

function CreateProfile() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserProfileDto>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "MALE",
    occupation: "",
    organization: "",
    profilePictureUrl: "",
    bio: "",
  });

  // Image state (shared between Step 2 and Step 3)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleSubmitProfile = async () => {
    console.log("Profile Data:", formData);
    console.log("Selected Image:", selectedImage);

    updateProfileData(formData, selectedImage);
    navigate("/roleselection");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative top blue banner */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 py-8 px-6 text-white relative overflow-hidden shadow-md">
        {/* Doodle overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${doodleBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center">
              <FaMotorcycle className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Ride Share</h1>
              <p className="text-xs text-blue-100">Setup your commuter profile</p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold bg-white/15 px-3 py-1 rounded-full text-blue-100 border border-white/20">
              Step {step} of 3
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center py-10 px-4 relative z-10">
        <div className="w-full max-w-xl">
          {/* Stepper Progress Bar Header */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              {/* Step 1 Indicator */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step === 1
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-50"
                      : step > 1
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > 1 ? <FaCheckCircle className="text-sm" /> : <FaUser className="text-xs" />}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-bold ${step === 1 ? "text-blue-600" : "text-gray-500"}`}>
                    Personal
                  </p>
                  <p className="text-[10px] text-gray-400">Basic Info</p>
                </div>
              </div>

              {/* Progress Line 1 */}
              <div className="flex-1 mx-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: step > 1 ? "100%" : "0%" }}
                />
              </div>

              {/* Step 2 Indicator */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step === 2
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-50"
                      : step > 2
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > 2 ? <FaCheckCircle className="text-sm" /> : <FaIdCard className="text-xs" />}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-bold ${step === 2 ? "text-blue-600" : "text-gray-500"}`}>
                    Profile
                  </p>
                  <p className="text-[10px] text-gray-400">Photo & Bio</p>
                </div>
              </div>

              {/* Progress Line 2 */}
              <div className="flex-1 mx-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: step > 2 ? "100%" : "0%" }}
                />
              </div>

              {/* Step 3 Indicator */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step === 3
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-50"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FaCheckCircle className="text-xs" />
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-bold ${step === 3 ? "text-blue-600" : "text-gray-500"}`}>
                    Review
                  </p>
                  <p className="text-[10px] text-gray-400">Confirm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Step Component */}
          {step === 1 && (
            <PersonalDetails
              step={step}
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {step === 2 && (
            <ProfileDetails
              step={step}
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              preview={preview}
              setPreview={setPreview}
            />
          )}

          {step === 3 && (
            <ProfileReview
              step={step}
              setStep={setStep}
              formData={formData}
              selectedImage={selectedImage}
              preview={preview}
              handleSubmitProfile={handleSubmitProfile}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400">
        &copy; Ride Share — Motorcycle Pooling Platform
      </footer>
    </div>
  );
}

export default CreateProfile;