import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import ProfileDetails from "./ProfileDetails";
import ProfileReview from "./ProfileReview";

export interface UserProfileDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  occupation: string;
  organization: string;
  profilePictureUrl: string;
  bio: string;
}

function Profile() {
  const [step, setStep] = useState(1);

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

    // TODO:
    // Create FormData and send to Spring Boot
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
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
  );
}

export default Profile;