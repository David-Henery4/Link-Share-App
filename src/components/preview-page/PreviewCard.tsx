import { Heading, BaseText } from "../reusable/text";
import { ArrowRightIcon } from "../icons";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { linksTable } from "@/db/schemas";
import Link from "next/link";
import DynamicIcon from "../icons/link-icons/DynamicIcon";

const PreviewCard = async ({ userIdParam }: { userIdParam: string }) => {
  const linksList = await db.query.linksTable.findMany({
    where: eq(linksTable.userId, userIdParam),
  });
  //
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
        {linksList.map((link) => {
          const isBgWhite = link?.platformColour === "#FFFFFF";
          //
          return (
            <li key={link.id} className="w-full">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden w-full max-w-60 rounded-lg p-4 z-20 flex justify-between items-center transition-all after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-10 after:hover:bg-purple hover:cursor-pointer hover:scale-105 ${
                  isBgWhite
                    ? "border border-border text-darkGrey hover:text-white"
                    : "text-white"
                }`}
                style={{ backgroundColor: `${link.platformColour}` }}
              >
                <div className="flex justify-start items-center gap-2 z-50">
                  <span>
                    <DynamicIcon
                      activePlatformId={link.platformId}
                      isPreview={true}
                    />
                  </span>
                  <p className="capitalize">{link.platformLabel}</p>
                </div>

                <span className="z-50">
                  <ArrowRightIcon />
                </span>
              </Link>
            </li>
          );
        })}
      </menu>
    </div>
  );
};

export default PreviewCard;
