"use client";
import LinkContainer from "./links/LinkContainer";
import { createLinks } from "@/db/queries/actions";
import { useActionState, useEffect } from "react";
import { LinksDetails, UpdatedPlatformDetails } from "@/types/types";
import { useToast } from "@/hooks/use-toast";

interface LinksListProps {
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
  linksListData: LinksDetails[];
  deletedList: LinksDetails[] | []
}

const LinksList = ({
  handleRemove,
  updateLinkValues,
  linksListData,
  deletedList,
}: LinksListProps) => {
  const { toast } = useToast();
  const [state, linksAction] = useActionState(
    createLinks.bind(null, linksListData, deletedList),
    {
      errors: [
        {
          id: undefined,
          url: undefined,
        },
      ],
      isNoList: false,
    }
  );
  //
  useEffect(() => {
    if (state?.isNoList) {
      toast({
        title: "Error",
        description:
          "There has been an error saving the links, please try again",
      });
    }
    if (!state) {
      toast({
        title: "Save Successfull",
        description: "Your links have been saved!",
      });
    }
  }, [state]);
  //
  return (
    <form
      id="links-list-form"
      className="w-full my-6 flex flex-col justify-center items-center gap-6"
      action={linksAction}
    >
      {linksListData.map((linkInformation, i) => {
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
