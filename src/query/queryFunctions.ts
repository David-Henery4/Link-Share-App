"use server"
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/server";
import { linksTable } from "@/db/schemas/linksSchema";
import { profileDetailsTable } from "@/db/schemas/profileDetailsSchema";
import { db } from "@/db";
import { createClient } from "@/utils/server";
import { eq } from "drizzle-orm";
// import { getTableColumns } from "drizzle-orm";

const fetchLinks = async () => {
  const supabase = await createClient();
  const {data} = await supabase.auth.getUser()
  const userId = data.user?.id
  if (!userId) return
  const linksList = await db.query.linksTable.findMany({where: eq(linksTable.userId, userId)})
  // const linksList = await db.selectDistinct({userId: userId}).from(linksTable)
  // const linksList = await db.select().from(linksTable)
  return linksList
};


const fetchProfileDetails = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  if (!userId) return;
  const userProfileDetails = await db.query.profileDetailsTable.findFirst({where: eq(profileDetailsTable.userId, userId)})
  return userProfileDetails
}


export { fetchLinks, fetchProfileDetails };
