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