import { ProfileImageUpload, Input } from "./form-comps";

const ProfileForm = () => {
  return (
    <form className="w-full mt-10">
      <ProfileImageUpload />
      <div className="w-full mt-6 grid gap-3 p-5 bg-lightGrey rounded-xl">
        <Input id="first-name" label="First Name" />
        <Input id="last-name" label="Last Name" />
        <Input id="email" label="Email" />
      </div>
    </form>
  );
};

export default ProfileForm;
