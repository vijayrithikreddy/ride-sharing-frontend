import { FaCamera, FaMotorcycle, FaUser } from "react-icons/fa";
import type { Profile } from "../interfaces/Profile";

interface ProfileHeaderProps {

    profile: Profile;

    editing: boolean;

    selectedImage: File | null;

    setSelectedImage: React.Dispatch<
        React.SetStateAction<File | null>
    >;

}

function ProfileHeader({

    profile,

    editing,

    selectedImage,

    setSelectedImage,

}: ProfileHeaderProps) {

    return (

        <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <div className="relative inline-block">

                <img
    src={
        selectedImage
            ? URL.createObjectURL(selectedImage)
            : profile.profilePictureUrl
                ? `http://localhost:8082${profile.profilePictureUrl}`
                : "/images/default-profile.png"
    }
    alt="Profile"
/>

                {editing && (

                    <>

                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 cursor-pointer shadow-lg"
                        >
                            <FaCamera />
                        </label>

                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {

                                if (e.target.files?.length) {

                                    setSelectedImage(
                                        e.target.files[0]
                                    );

                                }

                            }}
                        />

                    </>

                )}

            </div>

            <h1 className="mt-5 text-3xl font-bold">

                {profile.firstName} {profile.lastName}

            </h1>

            <div className="mt-3 flex justify-center">

                <span
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        profile.userMode === "RIDER"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                    }`}
                >

                    {profile.userMode === "RIDER" ? (

                        <>
                            <FaMotorcycle />
                            Rider
                        </>

                    ) : (

                        <>
                            <FaUser />
                            Passenger
                        </>

                    )}

                </span>

            </div>

        </div>

    );

}

export default ProfileHeader;