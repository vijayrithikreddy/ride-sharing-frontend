import type { UserProfileDto } from "../interfaces/UserProfileDto";
import DefaultAvatar from "../images/defaultavatar.png";
import { FaArrowLeft, FaCheckCircle, FaUser, FaPhone, FaCalendarAlt, FaVenusMars, FaBriefcase, FaBuilding, FaQuoteLeft } from "react-icons/fa";

interface ProfileReviewProps {
  step?: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: UserProfileDto;
  selectedImage: File | null;
  preview?: string;
  submitting?: boolean;
  handleSubmitProfile: () => void;
}

function ProfileReview({
  setStep,
  formData,
  selectedImage,
  preview,
  submitting = false,
  handleSubmitProfile,
}: ProfileReviewProps) {
  const decreaseStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 animate-fadeIn">
      {/* Step Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Review Profile</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please verify your information before submitting.
        </p>
      </div>

      {/* Avatar Header */}
      <div className="flex flex-col items-center justify-center mb-6 p-4 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl border border-blue-100/60">
        <div className="relative">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : preview || DefaultAvatar
            }
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto ring-4 ring-blue-50"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full shadow" title="Ready">
            <FaCheckCircle className="text-xs" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mt-3">
          {formData.firstName || "Rider"} {formData.lastName || ""}
        </h3>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
          {formData.occupation ? formData.occupation.replace("_", " ") : "COMMUTER"}
        </p>
      </div>

      {/* Summary Details Grid */}
      <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 space-y-3 text-sm">
        {/* Full Name */}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <FaUser className="text-blue-500 text-xs" /> Name
          </span>
          <span className="font-semibold text-gray-900">
            {formData.firstName} {formData.lastName}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <FaPhone className="text-blue-500 text-xs" /> Phone
          </span>
          <span className="font-medium text-gray-900">
            {formData.phoneNumber || "-"}
          </span>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <FaCalendarAlt className="text-blue-500 text-xs" /> Date of Birth
          </span>
          <span className="font-medium text-gray-900">
            {formData.dateOfBirth || "-"}
          </span>
        </div>

        {/* Gender */}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <FaVenusMars className="text-blue-500 text-xs" /> Gender
          </span>
          <span className="font-medium text-gray-900">
            {formData.gender || "-"}
          </span>
        </div>

        {/* Occupation */}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <FaBriefcase className="text-blue-500 text-xs" /> Occupation
          </span>
          <span className="font-medium text-gray-900">
            {formData.occupation ? formData.occupation.replace("_", " ") : "-"}
          </span>
        </div>

        {/* Organization */}
        <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <FaBuilding className="text-blue-500 text-xs" /> Organization
          </span>
          <span className="font-medium text-gray-900">
            {formData.organization || "-"}
          </span>
        </div>

        {/* Bio */}
        <div className="pt-1.5">
          <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            <FaQuoteLeft className="text-blue-500 text-xs" /> Bio
          </span>
          <p className="text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200/70 italic">
            "{formData.bio || "No bio added."}"
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          disabled={submitting}
          onClick={decreaseStep}
          className="px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 flex items-center gap-2 transition-all duration-200 disabled:opacity-50"
        >
          <FaArrowLeft className="text-xs" /> Back
        </button>

        <button
          type="button"
          disabled={submitting}
          onClick={handleSubmitProfile}
          className="bg-emerald-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/30 disabled:bg-gray-400 disabled:shadow-none"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving Profile...
            </>
          ) : (
            <>
              <FaCheckCircle className="text-sm" /> Complete Profile
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProfileReview;