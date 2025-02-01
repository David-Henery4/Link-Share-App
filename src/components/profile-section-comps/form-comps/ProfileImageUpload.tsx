import { BaseText } from "@/components/reusable/text";
import { UploadImageIcon } from "../../icons";

const ProfileImageUpload = () => {
  return (
    <div className="w-full grid gap-4 p-5 bg-lightGrey rounded-xl smallTablet:gap-10 smallTablet:grid-cols-formColumns lgLaptop:gap-20">
      <label htmlFor="imageFile" className="text-grey text-base font-normal tablet:inline-flex tablet:justify-start tablet:items-center">
        Profile Picture
      </label>
      <div className="flex flex-col justify-start items-start gap-6 tablet:flex-row tablet:items-center">
        <div className="text-center relative px-[38px] py-[60px] rounded-xl bg-purpleLight text-purple font-semibold inline-flex flex-col justify-center items-center">
          <span>
            <UploadImageIcon />
          </span>
          + Upload Image
          <input
            className="absolute top-0 left-0 w-full h-full opacity-0 hover:cursor-pointer"
            type="file"
            id="imageFile"
            accept="image/*"
          />
        </div>
        <BaseText size="small" className="max-w-[215px]">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </BaseText>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
