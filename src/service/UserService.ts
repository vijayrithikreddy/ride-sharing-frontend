import { getProfileStatus, getUserProfile, updateMode, updateProfile, uploadProfilePicture } from "../apis/UserApis"
import type { Profile } from "../interfaces/Profile";
import type { UserProfileDto } from "../interfaces/UserProfileDto"


export const updateProfileData = async (
    profile: UserProfileDto,
    image: File | null
) => {

    if (image) {

        const uploadResponse = await uploadProfilePicture(image);

        profile.profilePictureUrl = uploadResponse.data.imageUrl;

    }

    const response = await updateProfile(profile);
    localStorage.setItem("user",JSON.stringify(response.data));

    return response.data;

};
export const getProfileCompletedStatus = async (): Promise<boolean> => {
    const response = await getProfileStatus();
    return response.data;
};
export const updateUserMode = async (
    userMode: "RIDER" | "PASSENGER"
) => {
    const response = await updateMode(userMode);
    return response.data;
};
export const getProfile = async () => {

    const response = await getUserProfile();

    return response.data;

};
