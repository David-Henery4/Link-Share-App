// import { BaseText } from "@/components/reusable/text";

const MobilePreviewHeader = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-[19px] text-center">
      <div className="w-24 h-24 rounded-full  grid place-items-center">
        {/* <BaseText size="medium" className="text-white font-bold text-xl ">
          B.W
        </BaseText> */}
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
