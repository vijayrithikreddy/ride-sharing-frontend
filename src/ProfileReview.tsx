import React from "react";
import type { UserProfileDto } from "./Profile";
import DefaultAvatar from "./images/defaultavatar.png";

interface ProfileReviewProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: UserProfileDto;
  selectedImage: File | null;
  preview: string;
  handleSubmitProfile: () => void;
}

function ProfileReview({
  step,
  setStep,
  formData,
  preview,
  handleSubmitProfile,
}: ProfileReviewProps) {
  const decreaseStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-medium text-gray-500">
          Step {step} of 3
        </span>

        <span className="text-xs font-medium text-blue-600">
          Review Profile
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
        <div className="bg-blue-600 h-1 rounded-full w-full"></div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Review Your Profile
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Please verify your information before submitting.
        </p>
      </div>

      {/* Avatar */}

      <div className="flex justify-center mb-6">
        <img
          src={preview || DefaultAvatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Details */}

      <div className="space-y-3 text-sm">

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">First Name</span>
          <span>{formData.firstName}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Last Name</span>
          <span>{formData.lastName}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Phone</span>
          <span>{formData.phoneNumber}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Date of Birth</span>
          <span>{formData.dateOfBirth}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Gender</span>
          <span>{formData.gender}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Occupation</span>
          <span>{formData.occupation}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Organization</span>
          <span>{formData.organization}</span>
        </div>

        <div className="border-b pb-2">
          <p className="font-medium mb-1">Bio</p>
          <p className="text-gray-600">
            {formData.bio || "-"}
          </p>
        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-between mt-8">

        <button
          type="button"
          onClick={decreaseStep}
          className="px-4 py-2 border rounded-lg hover:border-blue-600 transition"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmitProfile}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Profile
        </button>

      </div>

    </div>
  );
}

export default ProfileReview;