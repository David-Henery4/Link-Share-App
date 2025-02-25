import { profileDetailsTable } from "../schemas/profileDetailsSchema";
import {linksTable} from "../schemas/linksSchema";
import { LinksDetails } from "@/types/types";
import { db } from "..";
import { and, eq, sql } from "drizzle-orm";

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
    return response
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function deleteLinks(deleteList: LinksDetails[]){
  try {
    let res;
    deleteList.forEach(async (link) => {
      res = await db
        .delete(linksTable)
        .where(
          and(
            eq(linksTable.userId, link.userId),
            eq(linksTable.id, link.id)
          )
        );
    })
    return res;
  } catch (error) {
    console.error(error)
    return;
  }
}