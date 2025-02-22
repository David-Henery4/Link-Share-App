"use server"
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/server";
import { linksTable } from "@/db/schemas/linksSchema";
import { db } from "@/db";

const fetchLinks = async () => {
  const linksList = await db.select().from(linksTable)
  return linksList
};

export { fetchLinks };
