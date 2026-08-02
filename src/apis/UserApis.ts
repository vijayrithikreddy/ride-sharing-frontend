import type { UserProfileDto } from "../interfaces/UserProfileDto";
import api from "./AxioConfig";

export const updateProfile = (data: UserProfileDto) => {
    return api.put("/userprofiles", data);
};

export const uploadProfilePicture = (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    return api.post(
        "/userprofiles/profile-picture",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

export const getProfileStatus = () => {
    return api.get("/userprofiles/profile-status");
};

export const updateMode = (userMode: "RIDER" | "PASSENGER") => {
    return api.patch("/userprofiles/mode", {
        userMode,
    });
};