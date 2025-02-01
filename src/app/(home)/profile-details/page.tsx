import { ProfileSection, SaveButton } from "@/components";

const ProfileDetails = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start max-w-[800px] mx-auto flex-[2] rounded-xl bg-white shadow-2xl laptop:max-w-none laptop:m-0">
      <ProfileSection/>
      <SaveButton/>
    </div>
  );
}

export default ProfileDetails