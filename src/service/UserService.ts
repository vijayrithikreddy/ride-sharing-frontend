import { getProfileStatus, getUserProfile, updateMode, updateProfile, uploadProfilePicture } from "../apis/UserApis";
import type { UserProfileDto } from "../interfaces/UserProfileDto";
import type { Profile } from "../interfaces/Profile";

export const uploadPicture = async (file: File) => {
  const response = await uploadProfilePicture(file);
  return response.data;
};

export const updateProfileData = async (
  profileData: UserProfileDto,
  selectedImage: File | null
) => {
  if (selectedImage) {
    const imageUrl = await uploadPicture(selectedImage);
    profileData.profilePictureUrl = imageUrl;
  }

  const response = await updateProfile(profileData);
  return response.data;
};

export const getProfileCompletedStatus = async () => {
  const response = await getProfileStatus();
  return response.data;
};

export const updateUserMode = async (mode: string) => {
  const response = await updateMode(mode as "RIDER" | "PASSENGER");
  return response.data;
};

export const getProfile = async (): Promise<Profile> => {
  const response = await getUserProfile();
  return response.data;
};
