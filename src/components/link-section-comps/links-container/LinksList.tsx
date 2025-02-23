"use client";
import LinkContainer from "./links/LinkContainer";
import useGlobalContext from "@/context/useGlobalContext";
import { createLinks } from "@/db/queries/actions";
import { useActionState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLinks } from "@/query/queryFunctions";
import { LinksDetails, UpdatedPlatformDetails } from "@/types/types";

const LinksList = () => {
  const queryClient = useQueryClient();
  const { currentLinksList } = useGlobalContext();
  const [state, linksAction] = useActionState(
    createLinks.bind(null, currentLinksList),
    {
      errors: [
        {
          id: undefined,
          url: undefined,
        },
      ],
    }
  );
  const { data, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: () => fetchLinks(),
    // staleTime: Infinity
  });
  console.log("LinksList data", data);
  //
  const handleRemove = (id: string) => {
    queryClient.setQueryData(["links"], (links: LinksDetails[]) => {
      return links.filter((item) => id !== item.id);
    });
  };
  //
  const updateLinkValues = (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => {
    if (valueName === "platform" && typeof newValue !== "string") {
      queryClient.setQueryData(["links"], (links: LinksDetails[]) => {
        return links.map((linkItem) => {
          if (linkId === linkItem.id) {
            return {
              ...linkItem,
              platformId: newValue.platformId,
              platformLabel: newValue.platformLabel,
              platformValue: newValue.platformValue,
              platformColour: newValue.platformColour,
            };
          }
          return linkItem;
        });
      });
      return;
    }

    if (valueName === "url" && typeof newValue === "string") {
      queryClient.setQueryData(["links"], (links: LinksDetails[]) => {
        return links.map((linkItem) => {
          if (linkId === linkItem.id) {
            return {
              ...linkItem,
              url: newValue,
            };
          }
          return linkItem;
        });
      });
    }
  };
  //
  return (
    <form
      id="links-list-form"
      className="w-full my-6 flex flex-col justify-center items-center gap-6"
      action={linksAction}
    >
      {isSuccess &&
        data.map((linkInformation, i) => {
          let errorValues;
          if (state?.errors) {
            errorValues = state.errors.find(
              (err) => err.id === linkInformation.id
            );
          }
          return (
            <LinkContainer
              key={i}
              linkIndex={i}
              errorValues={errorValues}
              handleRemove={handleRemove}
              updateLinkValues={updateLinkValues}
              {...linkInformation}
            />
          );
        })}
    </form>
  );
};

export default LinksList;
