import { profileDetailsTable } from "../schemas/profileDetailsSchema";
import {linksTable} from "../schemas/linksSchema";
import { LinksDetails } from "@/types/types";
import { db } from "..";
import { sql } from "drizzle-orm";

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
export async function addNewLinks(linksList: LinksDetails[]) {
  console.log(linksList)
  // Do we need to pass the userID if we are referencing another table?
  try {
    console.log("addNewLinks called!")
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
    console.log("Done", response)
    return response
  } catch (error) {
    console.error(error);
    return;
  }
}