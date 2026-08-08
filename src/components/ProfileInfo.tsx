import type { Profile } from "../interfaces/Profile";

interface PersonalInfoCardProps {

    profile: Profile;

    editing: boolean;

    setProfile: React.Dispatch<
        React.SetStateAction<Profile | null>
    >;

}

function PersonalInfoCard({
    profile,
    editing,
    setProfile,
}: PersonalInfoCardProps) {
    

    const EditableItem = ({
        label,
        field,
        value,
        readOnly = false,
    }: {
        label: string;
        field: keyof Profile;
        value: string | null | undefined;
        readOnly?: boolean;
    }) => (

        <div className="flex justify-between items-center py-3 border-b last:border-b-0">

            <span className="font-medium text-gray-600 w-40">
                {label}
            </span>

            {editing && !readOnly ? (

                <input
                    value={value ?? ""}
                    onChange={(e) =>
                        setProfile(prev => ({
                            ...prev!,
                            [field]: e.target.value,
                        }))
                    }
                    className="border rounded-lg px-3 py-2 w-72 text-right"
                />

            ) : (

                <span className="font-semibold text-gray-900">
                    {value || "-"}
                </span>

            )}

        </div>

    );

    return (

        <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">

                Personal Information

            </h2>

            <EditableItem
                label="First Name"
                field="firstName"
                value={profile.firstName}
            />

            <EditableItem
                label="Last Name"
                field="lastName"
                value={profile.lastName}
            />

            <EditableItem
                label="Email"
                field="email"
                value={profile.email}
                readOnly
            />

            <EditableItem
                label="Phone Number"
                field="phoneNumber"
                value={profile.phoneNumber}
            />

            <EditableItem
                label="Gender"
                field="gender"
                value={profile.gender}
                readOnly
            />

            <EditableItem
                label="Date of Birth"
                field="dateOfBirth"
                value={profile.dateOfBirth}
                readOnly
            />

            <EditableItem
                label="Occupation"
                field="occupation"
                value={profile.occupation}
                readOnly
            />

            <EditableItem
                label="Organization"
                field="organization"
                value={profile.organization}
            />

            <EditableItem
                label="Bio"
                field="bio"
                value={profile.bio}
            />

        </div>

    );

}

export default PersonalInfoCard;