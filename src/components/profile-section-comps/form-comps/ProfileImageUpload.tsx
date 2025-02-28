"use client";
import { BaseText } from "@/components/reusable/text";
import { UploadImageIcon } from "../../icons";
import ProfileImagePreview from "./image-comp/ProfileImagePreview";
import useGlobalContext from "@/context/useGlobalContext";

const ProfileImageUpload = ({
  savedImageUrl,
}: {
  savedImageUrl: string | null | undefined;
}) => {
  const {
    currentUpload,
    handleCheckImageUploadSize,
    isImageDimensionsInvalid,
  } = useGlobalContext();
  //
  return (
    <div className="w-full grid gap-4 p-5 bg-lightGrey rounded-xl smallTablet:gap-10 smallTablet:grid-cols-formColumns lgLaptop:gap-20">
      <label
        htmlFor="imageFile"
        className="text-grey text-base font-normal pointer-events-none tablet:inline-flex tablet:justify-start tablet:items-center"
      >
        Profile Picture
      </label>
      <div className="flex flex-col justify-start items-start gap-6 tablet:flex-row tablet:items-center">
        <div
          className={`text-center relative px-[38px] py-[60px] rounded-xl bg-purpleLight font-semibold inline-flex flex-col justify-center items-center overflow-hidden hover:cursor-pointer ${
            currentUpload || savedImageUrl ? "text-white" : "text-purple"
          }`}
        >
          {currentUpload ? (
            <ProfileImagePreview currentUpload={currentUpload} />
          ) : (
            !currentUpload &&
            savedImageUrl && (
              <ProfileImagePreview currentUpload={savedImageUrl} />
            )
          )}
          <span className="relative flex flex-col justify-center items-center z-20">
            <UploadImageIcon
              colour={currentUpload || savedImageUrl ? "#ffffff" : "#633CFF"}
            />{" "}
            + Upload Image
          </span>
          <input
            className="absolute top-0 left-0 w-full h-full opacity-0 z-50 hover:cursor-pointer"
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleCheckImageUploadSize}
          />
        </div>
        <div>
          <BaseText
            size="small"
            className={`max-w-[215px] ${
              isImageDimensionsInvalid && "text-red"
            }`}
          >
            Image must be below 1024x1024px.
          </BaseText>
          <BaseText size="small" className="max-w-[215px]">
            Use PNG or JPG format.
          </BaseText>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
