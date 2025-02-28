"use client";
import { BaseText } from "@/components/reusable/text";
import useGlobalContext from "@/context/useGlobalContext";
import Image from "next/image";

const MobilePreviewHeader = ({
  profileData,
}: {
  profileData:
    | {
        id: string;
        userId: string;
        userEmail: string;
        firstName: string | null;
        lastName: string | null;
        profilePicture: string | null;
      }
    | undefined;
}) => {
  const { currentUpload } = useGlobalContext();
  //
  return (
    <div className="flex flex-col justify-start items-center gap-[19px] text-center">
      {profileData?.firstName && profileData?.lastName && (
        <div className="w-24 h-24 rounded-full overflow-hidden grid place-items-center bg-purple">
          {currentUpload ? (
            <Image
              src={currentUpload}
              alt="Profile Avatar"
              width={275}
              height={275}
              className="w-full h-full object-cover object-center"
            />
          ) : !currentUpload && profileData?.profilePicture ? (
            <Image
              src={profileData?.profilePicture}
              alt="Profile Avatar"
              width={275}
              height={275}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <BaseText size="medium" className="text-white font-bold text-xl ">
              {`${profileData.firstName.slice(
                0,
                1
              )}.${profileData.lastName.slice(0, 1)}`}
            </BaseText>
          )}
        </div>
      )}

      <div className="w-full">
        <div className="min-h-7">
          {(profileData?.firstName || profileData?.lastName) && (
            <BaseText
              size="medium"
              className="text-darkGrey text-lg font-semibold"
            >
              {`${profileData.firstName ? profileData.firstName : ""} ${
                profileData.lastName ? profileData.lastName : ""
              }`}
            </BaseText>
          )}
          {/* <BaseText
            size="medium"
            className="text-darkGrey text-lg font-semibold"
          >
            {``}
          </BaseText> */}
        </div>
        <div className="min-h-5">
          {profileData?.userEmail && (
            <BaseText size="small" className="text-sm">
              {profileData?.userEmail}
            </BaseText>
          )}
          {/* <BaseText size="small" className="text-sm">
            ben@example.com
          </BaseText> */}
        </div>
      </div>
    </div>
  );
};

export default MobilePreviewHeader;
