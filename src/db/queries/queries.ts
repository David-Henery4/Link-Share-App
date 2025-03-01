import { profileDetailsTable } from "../schemas/profileDetailsSchema";
import { linksTable } from "../schemas/linksSchema";
import { LinksDetails } from "@/types/types";
import { db } from "..";
import { and, eq, sql } from "drizzle-orm";
import { createClient } from "@/utils/server";

// // EMAIL HAS TO BE UPDATED IN AUTH & PROFILE DETAILS

// Create Profile Details
export async function createProfileDetails(userId: string, userEmail: string) {
  try {
    await db
      .insert(profileDetailsTable)
      .values({ userEmail, userId })
      .onConflictDoNothing({ target: profileDetailsTable.userId });
  } catch (error) {
    console.error(error);
    return;
  }
}

interface NewProfileDetails {
  firstName: string;
  lastName: string;
  userEmail: string;
  profilePicture: string | undefined; // File | null
}

// Update Profile Details
export async function updateProfileDetails(details: NewProfileDetails) {
  try {
    const supabase = await createClient();

    // Update the userEmail in the auth
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      email: details.userEmail,
    });
    if (error) {
      return { isSuccess: false, errorMsg: error.message };
    }

    // Update the whole profile details row (Based on userId)
    if (user?.id) {
      await db
        .update(profileDetailsTable)
        .set({
          firstName: details.firstName,
          lastName: details.lastName,
          userEmail: user.new_email,
          profilePicture: details.profilePicture // Will be url
        })
        .where(eq(profileDetailsTable.userId, user?.id));
        //
      if (user?.new_email) {
        return {
          isSuccess: true,
          successMsg:
            "Profile updated successfully & Email change confirmation has been sent to your new email.",
        };
      }
      return { isSuccess: true, successMsg: "Profile updated successfully" };
    }

    return { isSuccess: false, errorMsg: "User ID not found" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { isSuccess: false, errorMsg: "An unexpected error occurred" };
  }
}

// Add linksList to the database
export async function addNewLinks(linksList: LinksDetails[]) {
  try {
    const response = await db
      .insert(linksTable)
      .values(linksList)
      .onConflictDoUpdate({
        target: linksTable.id,
        set: {
          url: sql.raw(`excluded.${linksTable.url.name}`),
          platformColour: sql.raw(`excluded.${linksTable.platformColour.name}`),
          platformId: sql.raw(`excluded.${linksTable.platformId.name}`),
          platformLabel: sql.raw(`excluded.${linksTable.platformLabel.name}`),
          platformValue: sql.raw(`excluded.${linksTable.platformValue.name}`),
        },
      });
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function deleteLinks(deleteList: LinksDetails[]) {
  try {
    let res;
    deleteList.forEach(async (link) => {
      res = await db
        .delete(linksTable)
        .where(
          and(eq(linksTable.userId, link.userId), eq(linksTable.id, link.id))
        );
    });
    return res;
  } catch (error) {
    console.error(error);
    return;
  }
}
