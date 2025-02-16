"use client";
import DragAndDropIcon from "../../../icons/DragAndDropIcon";
import Button from "../../../reusable/Button";
import { SelectInput, UrlInput } from "./link-inputs";
import { LinksDetails } from "@/types/types"; // LinksInfo
import useGlobalContext from "@/context/useGlobalContext";

interface LinkContainerProps extends LinksDetails {
  linkIndex: number;
}

const LinkContainer = ({
  linkIndex,
  url,
  id,
  // platform,
  platformId,
  platformLabel,
  platformValue
}: LinkContainerProps) => {
  const {handleRemoveLink} = useGlobalContext()
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
              handleRemoveLink(id);
            }}
          >
            Remove
          </Button>
        </div>
      </div>

      <form className="w-full mt-3">
        <SelectInput
          activePlatform={{
            id: platformId,
            label: platformLabel,
            value: platformValue,
          }}
          id={id}
        />

        <UrlInput url={url} id={id} />
      </form>
    </div>
  );
};

export default LinkContainer;
