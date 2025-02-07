"use client";
import { BaseText } from "@/components/reusable/text";
import { UploadImageIcon } from "../../icons";
import { useState } from "react";
import { ChangeEvent } from "react";
import ProfileImagePreview from "./image-comp/ProfileImagePreview";

const ProfileImageUpload = () => {
  // Might move to context, so we can use the preview on the mobile illustration
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
  const [isImageDimensionsInvalid, setIsImageDimensionsInvalid] = useState(false);
  //
  const handleSetFileState = (e: FileList) => {
    if (!e) return;
    const reader = new FileReader();

    reader.onload = () => {
      setCurrentUpload(
        typeof reader.result === "string" ? reader.result : null
      );
    };

    reader.onerror = function (event) {
      if (event.target) {
        console.log("Error reading file:", event.target.error);
      }
      return;
    };

    reader.readAsDataURL(e[0]);
  };
  //
  const handleCheckImageUploadSize = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files; 
    if (!file) return;
    //
    const img = new Image();
    img.src = window.URL.createObjectURL(file[0]);
    img.onload = () => {
      if (img.naturalHeight > 1024 || img.naturalWidth > 1024) {
        setIsImageDimensionsInvalid(true);
        window.URL.revokeObjectURL(img.src);
        return;
      }
      setIsImageDimensionsInvalid(false);
      window.URL.revokeObjectURL(img.src);
      handleSetFileState(file);
    }
  };
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
            currentUpload ? "text-white" : "text-purple"
          }`}
        >
          {currentUpload && (
            <ProfileImagePreview currentUpload={currentUpload} />
          )}
          <span className="relative flex flex-col justify-center items-center z-20">
            <UploadImageIcon colour={currentUpload ? "#ffffff" : "#633CFF"} /> +
            Upload Image
          </span>
          <input
            className="absolute top-0 left-0 w-full h-full opacity-0 z-50 hover:cursor-pointer"
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleCheckImageUploadSize}
          />
        </div>
        <div>
          <BaseText size="small" className={`max-w-[215px] ${isImageDimensionsInvalid && "text-red"}`}>
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
