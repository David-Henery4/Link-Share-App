"use client";
import { BaseText } from "@/components/reusable/text";
import { UploadImageIcon } from "../../icons";
import { useState } from "react";
import { ChangeEvent } from "react";
import Image from "next/image";

const ProfileImageUpload = () => {
  // Might move to context, so we can use the preview on the mobile illustration
  const [currentUpload, setCurrentUpload] = useState<
    string | null
  >(null);
  //
  const handleSetFileState = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.currentTarget?.files) {
      // setCurrentUpload(e?.currentTarget?.files[0]);
      const reader = new FileReader();
      //
      reader.onload = () => {
        setCurrentUpload(reader.result);
      };
      //
      reader.onerror = function (event) {
        if (event.target) {
          console.log("Error reading file:", event.target.error);
        }
      };
      reader.readAsDataURL(e?.currentTarget?.files[0]);
      console.log("Reader: ", reader);
      // const objectUrl = URL.createObjectURL(e?.currentTarget?.files[0]);
      // setCurrentUpload(objectUrl);
    }
  };
  // const handleRevoke = () => {
  //   if (currentUpload) URL.revokeObjectURL(currentUpload);
  // };
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
            <>
              <Image
                width={1024}
                height={1024}
                className="absolute top-0 left-0 w-full h-full object-cover object-center"
                src={currentUpload}
                alt=""
                // onLoad={handleRevoke}
              />
              <div className="absolute top-0 left-0 w-full h-full z-10 bg-black/50"></div>
            </>
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
            onChange={handleSetFileState}
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
