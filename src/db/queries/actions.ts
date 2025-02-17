"use server";
import { z } from "zod";
import { LinksDetails } from "@/types/types";
// import { addNewLinks } from "./queries";

interface CreateLinksErrorReturnType {
  errors: ErrorList[]
}

const createLinkSchema = z.object({
  url: z.string().url({ message: "Invalid url" }).trim(),
});

interface ErrorList {
  id: string | undefined;
  url: string[] | undefined;
}

export async function createLinks(
  currentLinks: LinksDetails[],
  _prevState: unknown,
  _formData: FormData
): Promise<undefined | CreateLinksErrorReturnType> {
  try {
    const urlRay: ErrorList[] = [];

    currentLinks.forEach((item) => {
      const results = createLinkSchema.safeParse(item);
      if (results.error) {
        urlRay.push({
          id: item.id,
          url: results.error.flatten().fieldErrors.url || [
            "This URL is invalid",
          ],
        });
      }
    });
    console.log("Url Error Array:", urlRay);
    
    if (urlRay.length >= 1) {
      return { errors: urlRay };
    }

    console.log("success: ", currentLinks)

  } catch (error) {
    console.error(error);
  }
}
