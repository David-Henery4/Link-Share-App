import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import SortableLinkContainer from "./links/SortableLinkContainer";
import { Dispatch, SetStateAction } from "react";
import { LinksDetails, LinkErrorDetails, UpdatedPlatformDetails } from "@/types/types";

interface LinksPropsAndItemsList extends LinksDetails {
  setItems: Dispatch<SetStateAction<LinksDetails[]>>;
  linkIndex: number;
  errorValues?: LinkErrorDetails;
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

const SortableLink = (props: LinksPropsAndItemsList) => {
  //
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });
  //
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  //
  return (
    <SortableLinkContainer
      setNodeRef={setNodeRef}
      setActivatorNodeRef={setActivatorNodeRef}
      style={style}
      {...props}
      {...attributes}
      listeners={listeners}
    />
  );
};

export default SortableLink;
