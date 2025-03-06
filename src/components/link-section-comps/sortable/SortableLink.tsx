import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import SortableLinkContainer from "./links/SortableLinkContainer";
import {
  LinksPropsAndItemsList,
} from "@/types/types";


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
