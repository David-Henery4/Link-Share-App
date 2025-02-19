"use client";
import useGlobalContext from "@/context/useGlobalContext";
import { ArrowRightIcon } from "@/components/icons";
import DynamicIcon from "@/components/icons/link-icons/DynamicIcon";

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
              className={`w-full py-3 px-4 rounded-lg flex justify-between items-center ${
                link.platformValue === "frontendmentor" &&
                "border border-border"
              }`}
              style={{ backgroundColor: `${link.platformColour}` }}
            >
              <div className="flex justify-center items-center gap-2">
                <DynamicIcon
                  activePlatformId={link.platformId}
                  isPreview={true}
                />
                <p
                  className={`${
                    link.platformValue === "frontendmentor"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {link.platformLabel}
                </p>
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
