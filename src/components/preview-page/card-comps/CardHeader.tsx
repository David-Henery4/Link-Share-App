import { db } from "@/db";
import { eq } from "drizzle-orm";
import { profileDetailsTable } from "@/db/schemas";
import { BaseText, Heading } from "@/components/reusable/text";
import Image from "next/image";

const CardHeader = async ({ userIdParam }: { userIdParam: string }) => {
  const profileDetails = await db.query.profileDetailsTable.findFirst({
    where: eq(profileDetailsTable.userId, userIdParam),
  });
  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <div className="relative w-28 h-28 bg-purpleLight rounded-full border-4 border-purple grid place-items-center overflow-hidden">
        {profileDetails?.profilePicture && (
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            src={profileDetails.profilePicture}
            alt={
              profileDetails?.firstName && profileDetails?.lastName
                ? `Profile avatar for: ${profileDetails?.firstName} ${profileDetails?.lastName}`
                : "Profile avatar"
            }
            height={224}
            width={224}
          />
        )}
        {!profileDetails?.profilePicture &&
          profileDetails?.firstName &&
          profileDetails?.lastName && (
            <BaseText size="medium">{`${profileDetails?.firstName.slice(
              0,
              1
            )} ${profileDetails?.lastName.slice(0, 1)}`}</BaseText>
          )}
      </div>

      <div className="mt-2">
        {profileDetails?.firstName && profileDetails?.lastName && (
          <Heading size="medium">{`${profileDetails?.firstName} ${profileDetails?.lastName}`}</Heading>
        )}
        <BaseText size="medium">{profileDetails?.userEmail}</BaseText>
      </div>
    </div>
  );
};

export default CardHeader;
