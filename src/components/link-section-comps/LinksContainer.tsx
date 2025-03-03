"use client";
import Button from "../reusable/Button";
// import LinksList from "./links-container/LinksList";
import EmptyContainer from "./links-container/EmptyContainer";
import linkOptions from "@/local-data/linkOptions";
//
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLinks } from "@/query/queryFunctions";
import { LinksDetails, UpdatedPlatformDetails } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import SortableContainer from "./SortableContainer";

const LinksContainer = ({currentUserId}: {currentUserId: string | undefined}) => {
  // list of linkIds to be deleted when save button is clicked
  const [linksToBeDeleted, setLinksToBeDeleted] = useState<LinksDetails[] | []>(
    []
  );
  //
  const queryClient = useQueryClient();
  //
  const { data, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: () => fetchLinks(),
    // staleTime: Infinity,
  });
  //
  const handleAddNew = () => {
    if (!currentUserId) return;
    // //
    queryClient.setQueryData(["links"], (links: LinksDetails[]) => {
      return [
        ...links,
        {
          id: uuidv4(),
          url: "",
          userId: currentUserId,
          platformId: linkOptions[0].id,
          platformValue: linkOptions[0].value,
          platformLabel: linkOptions[0].label,
          platformColour: linkOptions[0].color,
        },
      ];
    });
  };
  //
  const handleRemove = (id: string) => {
    const itemToBeDeleted = data?.find((link) => link.id === id);
    if (itemToBeDeleted) {
      setLinksToBeDeleted((prevValues) => {
        return [...prevValues, itemToBeDeleted];
      });
    }
    //
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
    <div className="w-full mt-10">
      <Button
        disabled={isSuccess && data && data.length >= linkOptions.length}
        buttonType="secondary"
        size="large"
        onClick={handleAddNew}
        // onClick={handleAddNewLink}
      >
        + Add new link
      </Button>
      {!isSuccess || !data || data?.length <= 0 ? (
        <EmptyContainer />
      ) : (
        <SortableContainer
          linksListData={data}
          deletedList={linksToBeDeleted}
          handleRemove={handleRemove}
          updateLinkValues={updateLinkValues}
        />
      )}
    </div>
  );
};

export default LinksContainer;
