"use server";
import {
  LinksDetails,
  LinkErrorsList,
  LinkErrorDetails,
  // ProfileDetails,
} from "@/types/types";
import { addNewLinks, deleteLinks, updateProfileDetails } from "./queries";
import { z } from "zod";
// import { createClient } from "@/utils/server";
// import { db } from "..";

const handleUrlCheck = (platformValue: string, url: string, ext: string) => {
  if (platformValue === "twitter") {
    return new RegExp(`^(?:https://)?(?:www.)?https://x.com(?:/.*)?$`).test(
      url
    );
  }
  if (platformValue === "gitlab") {
    return new RegExp(`^(?:https://)?(?:www.)?about.gitlab.com(?:/.*)?$`).test(
      url
    );
  }
  return new RegExp(
    `^(?:https://)?(?:www.)?${platformValue}.${ext}(?:/.*)?$`
  ).test(url);
};

export async function createLinks(
  currentLinks: LinksDetails[] | undefined,
  deletedList: LinksDetails[] | [],
  _prevState: unknown,
  _formData: FormData
): Promise<undefined | LinkErrorsList> {
  try {
    if (!currentLinks) {
      return {
        errors: [{ id: undefined, url: undefined }],
        isNoList: true,
        isSuccess: false,
      };
    }

    const urlRay: LinkErrorDetails[] = [];

    currentLinks.forEach((item) => {
      // Check for invalid Empty URL
      if (item.url.length <= 0) {
        urlRay.push({
          id: item.id,
          url: ["Can't be empty"],
        });
        return;
      }

      // .io
      if (
        item.platformValue === "codepen" ||
        item.platformValue === "frontendmentor"
      ) {
        const checkIoPlatformURL = handleUrlCheck(
          item.platformValue,
          item.url,
          "io"
        );
        if (!checkIoPlatformURL)
          urlRay.push({
            id: item.id,
            url: ["Please check the URL"],
          });
        return;
      }

      // .tv
      if (item.platformValue === "twitch") {
        const checkTvPlatformURL = handleUrlCheck(
          item.platformValue,
          item.url,
          "tv"
        );
        if (!checkTvPlatformURL)
          urlRay.push({
            id: item.id,
            url: ["Please check the URL"],
          });
        return;
      }

      // .org
      if (item.platformValue === "freecodecamp") {
        const checkOrgPlatformURL = handleUrlCheck(
          item.platformValue,
          item.url,
          "org"
        );
        if (!checkOrgPlatformURL)
          urlRay.push({
            id: item.id,
            url: ["Please check the URL"],
          });
        return;
      }

      // Check if URL is correct pattern (Please check the URL)
      const checkNewPlatformURL = handleUrlCheck(
        item.platformValue,
        item.url,
        "com"
      );
      if (!checkNewPlatformURL)
        urlRay.push({
          id: item.id,
          url: ["Please check the URL"],
        });
    });

    if (urlRay.length >= 1) {
      return { errors: urlRay, isNoList: false, isSuccess: false };
    }

    if (deletedList.length >= 1) {
      await deleteLinks(deletedList);
    }

    // Success
    await addNewLinks(currentLinks);

    // Reset Error (No sure if needed)
    return {
      errors: [{ id: undefined, url: undefined }],
      isNoList: false,
      isSuccess: true,
    };
  } catch (error) {
    console.error(error);
  }
}

interface UpdateProfileDetailsErrors {
  errors: {
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    userEmail?: string[] | undefined;
  };
  success: {
    isSuccess?: boolean | undefined;
    successMsg?: string | undefined;
    errorMsg?: string | undefined;
  };
}

const profileDetailsSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Can't be empty" }),
  lastName: z.string().trim().min(1, { message: "Can't be empty" }),
  userEmail: z.string().trim().email({ message: "Invalid email" }),
});

export async function handleProfileDetailsUpdate(
  _prevState: unknown,
  formData: FormData
): Promise<undefined | UpdateProfileDetailsErrors> {
  const results = profileDetailsSchema.safeParse(Object.fromEntries(formData));

  // Add basic validation ✅
  if (results.error) {
    return {
      errors: results.error.flatten().fieldErrors,
      success: {},
    };
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const userEmail = formData.get("userEmail") as string;
  // const imageFile = formData.get("imageFile");

  // Send image to cloudinary, get url back & save url in with profile details

  const newDetails = {
    firstName,
    lastName,
    userEmail,
    imageFile: null,
  };

  const { isSuccess, errorMsg, successMsg } = await updateProfileDetails(
    newDetails
  );

  if (!isSuccess) {
    console.log("Success?...", isSuccess, errorMsg);
    return {
      errors: {},
      success: { errorMsg, isSuccess, successMsg },
    };
  }

  console.log("Success?...", isSuccess, successMsg);

  if (isSuccess){
    return {
      success: {
        errorMsg,
        isSuccess,
        successMsg
      },
      errors: {
        
      }
    }
  }

  return undefined;
}

// // EMAIL HAS TO BE UPDATED IN AUTH & PROFILE DETAILS
