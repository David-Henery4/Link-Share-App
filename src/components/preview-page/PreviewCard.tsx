import { Heading, BaseText } from "../reusable/text";
import { ArrowRightIcon } from "../icons";

// linkOptions is temp till we get the real data
import linkOptions from "@/local-data/linkOptions";

const PreviewCard = () => {
  return (
    <div className="smMob:px-14 smMob:py-12 smMob:rounded-3xl smMob:bg-white smMob:shadow-card">
      {/* CARD HEADER */}
      <div className="w-full flex flex-col justify-center items-center text-center">
        <div className="w-28 h-28 bg-purpleLight rounded-full border-4 border-purple grid place-items-center">
          <p>BW</p>
        </div>

        <div>
          <Heading size="medium">Ben Wright</Heading>
          <BaseText size="medium">ben@example.com</BaseText>
        </div>
      </div>

      {/* CARD Links */}
      <menu className="w-full mt-14 flex flex-col justify-center items-center gap-5">
        {linkOptions.map((link) => {
          const isBgWhite = link?.color === "#FFFFFF";
          //
          return (
            <li
              key={link.id}
              className={`group relative overflow-hidden w-full max-w-60 rounded-lg p-4 z-20 flex justify-between items-center transition-all after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-10 after:hover:bg-purple hover:cursor-pointer hover:scale-105 ${
                isBgWhite ? "border border-border text-darkGrey hover:text-white" : "text-white"
              }`}
              style={{ backgroundColor: `${link.color}` }}
            >
              <div className="flex justify-start items-center gap-2 z-50">
                <span>
                  <link.icon isPreview={true} />
                </span>
                <p>{link.label}</p>
              </div>

              <span className="z-50">
                <ArrowRightIcon />
              </span>
            </li>
          );
        })}
      </menu>
    </div>
  );
};

export default PreviewCard;
