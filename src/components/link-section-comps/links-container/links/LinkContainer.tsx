"use client";
import DragAndDropIcon from "../../../icons/DragAndDropIcon";
import Button from "../../../reusable/Button";
import { SelectInput, UrlInput } from "./link-inputs";
import { LinksDetails, LinkErrorDetails, UpdatedPlatformDetails } from "@/types/types"; // LinksInfo
// import useGlobalContext from "@/context/useGlobalContext";
// import { useQueryClient } from "@tanstack/react-query";

interface LinkContainerProps extends LinksDetails {
  linkIndex: number;
  errorValues?: LinkErrorDetails;
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

const LinkContainer = ({
  linkIndex,
  url,
  id,
  // platform,
  platformId,
  platformLabel,
  platformValue,
  errorValues,
  //
  handleRemove,
  updateLinkValues
}: LinkContainerProps) => {
  // const {handleRemoveLink} = useGlobalContext()
  // const queryClient = useQueryClient();
  //
  // const handleRemove = () => {
  //   // setCurrentLinksList((prevValues) => {
  //   //   return prevValues.filter((item) => id !== item.id);
  //   // });
  // };
  //
  return (
    <div className="w-full p-5 rounded-xl bg-lightGrey">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-2 font-bold text-grey">
          <div className="hover:cursor-pointer">
            <DragAndDropIcon />
          </div>
          <h2>Link {`#${linkIndex + 1}`}</h2>
        </div>

        <div>
          <Button
            buttonType="third"
            className="font-medium p-0 hover:text-darkGrey"
            onClick={() => {
              handleRemove(id);
            }}
            type="button"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className="w-full mt-3">
        <SelectInput
          updateLinkValues={updateLinkValues}
          activePlatform={{
            id: platformId,
            label: platformLabel,
            value: platformValue,
          }}
          id={id}
        />

        <UrlInput
          updateLinkValues={updateLinkValues}
          url={url}
          id={id}
          errorValues={errorValues}
        />
      </div>
    </div>
  );
};

export default LinkContainer;
