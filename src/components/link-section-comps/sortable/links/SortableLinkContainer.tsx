"use client";
import DragAndDropIcon from "../../../icons/DragAndDropIcon";
import Button from "../../../reusable/Button";
import { SelectInput, UrlInput } from "../links/inputs";
import {
  LinksDetails,
  LinkErrorDetails,
  UpdatedPlatformDetails,
} from "@/types/types";
import { DnDTypes } from "../../SortableContainer";

type DndAndListTypes = LinksDetails & DnDTypes;

interface LinkContainerProps extends DndAndListTypes {
  linkIndex: number;
  errorValues?: LinkErrorDetails;
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

const SortableLinkContainer = ({
  // linkIndex,
  url,
  id,
  // platform,
  platformId,
  platformLabel,
  platformValue,
  errorValues,
  //
  handleRemove,
  updateLinkValues,
  //
  listeners,
  setActivatorNodeRef,
  setNodeRef,
  style,
  orderNumber
  //
}: LinkContainerProps) => {
  //
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full p-5 rounded-xl bg-lightGrey"
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-2 font-bold text-grey">
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            className="hover:cursor-pointer"
          >
            <DragAndDropIcon />
          </div>
          <h2>Link {`#${orderNumber}`}</h2>
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

export default SortableLinkContainer;
