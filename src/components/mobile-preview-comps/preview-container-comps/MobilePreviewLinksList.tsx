"use client";
import useGlobalContext from "@/context/useGlobalContext";
import { ArrowRightIcon } from "@/components/icons";

const MobilePreviewLinksList = () => {
  const { currentLinksList } = useGlobalContext();
  //
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      {currentLinksList
        .map((link) => {
          return (
            <div
              key={link.id}
              className="w-full py-3 px-4 rounded-lg flex justify-between items-center"
              style={{ backgroundColor: `${link.platform.color}` }}
            >
              <div className="flex justify-center items-center gap-2">
                <link.platform.icon isPreview={true} />
                <p className="text-white">{link.platform.label}</p>
              </div>
              <ArrowRightIcon />
            </div>
          );
        })
        .slice(0, 5)}
    </div>
  );
};

export default MobilePreviewLinksList;
