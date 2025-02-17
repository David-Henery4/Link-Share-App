import { profileDetailsTable } from "../schemas/profileDetailsSchema";
import { db } from "..";

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

// Add linksList to the database
// export async function addNewLinks(params) {
//   // console.log(params)
// }