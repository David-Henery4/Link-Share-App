"use client";
import { BaseText } from "@/components/reusable/text";
import useGlobalContext from "@/context/useGlobalContext";
import Image from "next/image";

const MobilePreviewHeader = () => {
  const {currentUpload} = useGlobalContext()
  //
  return (
    <div className="flex flex-col justify-start items-center gap-[19px] text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden grid place-items-center bg-purple">
        {currentUpload ? (
          <Image
            src={currentUpload}
            alt="Profile Avatar"
            width={275}
            height={275}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          // TEMP: Will change to be dynamic
          <BaseText size="medium" className="text-white font-bold text-xl ">
            B.W
          </BaseText>
        )}
      </div>

      <div className="w-full">
        <div className="min-h-7">
          {/* <BaseText
            size="medium"
            className="text-darkGrey text-lg font-semibold"
          >
            Ben Wright
          </BaseText> */}
        </div>
        <div className="min-h-5">
          {/* <BaseText size="small" className="text-sm">
            ben@example.com
          </BaseText> */}
        </div>
      </div>
    </div>
  ); 
};

export default MobilePreviewHeader;
