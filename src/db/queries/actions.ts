"use server";
// import { z } from "zod";
import { LinksDetails, LinkErrorsList, LinkErrorDetails } from "@/types/types";
// import { addNewLinks } from "./queries";

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
  currentLinks: LinksDetails[],
  _prevState: unknown,
  _formData: FormData
): Promise<undefined | LinkErrorsList> {
  try {
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
        if (!checkIoPlatformURL) urlRay.push({
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
        console.log("frrecodecamp")
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
      const checkNewPlatformURL = handleUrlCheck(item.platformValue, item.url, "com")
      if (!checkNewPlatformURL)
        urlRay.push({
          id: item.id,
          url: ["Please check the URL"],
        });
    });

    if (urlRay.length >= 1) {
      console.log("Error Array: ", urlRay);
      return { errors: urlRay };
    }

    // Success
  } catch (error) {
    console.error(error);
  }
}
