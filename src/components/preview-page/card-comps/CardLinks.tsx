import { db } from "@/db";
import { eq } from "drizzle-orm";
import { linksTable } from "@/db/schemas";
import DynamicIcon from "../../icons/link-icons/DynamicIcon";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

const CardLinks = async ({ userIdParam }: { userIdParam: string }) => {
  const linksList = await db.query.linksTable.findMany({
    where: eq(linksTable.userId, userIdParam),
  });
  return (
    <>
      {" "}
      {linksList && linksList.length >= 1 ? (
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
      ) : (
        <div className="w-full mt-14 flex flex-col gap-5">
          <div className="w-full h-11 bg-offGrey rounded-lg"></div>
          <div className="w-full h-11 bg-offGrey rounded-lg"></div>
          <div className="w-full h-11 bg-offGrey rounded-lg"></div>
          <div className="w-full h-11 bg-offGrey rounded-lg"></div>
          <div className="w-full h-11 bg-offGrey rounded-lg"></div>
        </div>
      )}{" "}
    </>
  );
};

export default CardLinks;
