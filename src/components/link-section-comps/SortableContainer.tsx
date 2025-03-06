import { useState, useEffect, useActionState } from "react";
import { createLinks } from "@/db/queries/actions";
import {
  LinksDetails,
  SortableContainerProps,
  ActiveIdState
} from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableLink from "./sortable/SortableLink";
import SortableLinkContainer from "./sortable/links/SortableLinkContainer";
import { useQueryClient } from "@tanstack/react-query";

const SortableContainer = ({
  linksListData,
  deletedList,
  handleRemove,
  updateLinkValues,
}: SortableContainerProps) => {
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<ActiveIdState>(null);
  const [activeItem, setActiveItem] = useState<LinksDetails | null>(null);
  const [items, setItems] = useState<LinksDetails[]>(linksListData);
  const { toast } = useToast();
  const [state, linksAction] = useActionState(
    createLinks.bind(null, items, deletedList),
    {
      errors: [
        {
          id: undefined,
          url: undefined,
        },
      ],
      isNoList: false,
      isSuccess: false,
    }
  );
  //
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  //
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveItem(() => items.filter((item) => item.id === active.id)[0]);
  };
  //
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    //
    if (over !== null && active.id !== over.id) {
      setItems((items) => {
        const testIndexOld = items
          .map((item) => item.id)
          .indexOf(String(active.id));

        const testIndexNew = items
          .map((item) => item.id)
          .indexOf(String(over.id));

        const newArray = arrayMove(items, testIndexOld, testIndexNew);
        // return newArray;

        //Check for order number update
        const newArrayWithNewOrderNumber = newArray.map((item, i, _) => {
          return { ...item, orderNumber: i + 1 };
        });

        handleUpdateOrderNumber(newArrayWithNewOrderNumber);

        return newArrayWithNewOrderNumber;
      });
    }
    //
    setActiveId(null);
  };
  //
  const handleUpdateOrderNumber = (newArray: LinksDetails[]) => {
    queryClient.setQueryData(["links"], () => newArray);
  };
  //
  useEffect(() => {
    setItems(linksListData);
  }, [linksListData]);
  //
  //
  useEffect(() => {
    if (state?.isNoList) {
      toast({
        title: "Error",
        description:
          "There has been an error saving the links, please try again",
      });
    }
    if (state?.isSuccess) {
      toast({
        title: "Save Successfull",
        description: "Your links have been saved!",
      });
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps
  //
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <form
          id="links-list-form"
          className="w-full my-6 flex flex-col justify-center items-center gap-6"
          action={linksAction}
        >
          {items
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map((linkInformation, i) => {
              let errorValues;
              if (state?.errors) {
                errorValues = state.errors.find(
                  (err) => err.id === linkInformation.id
                );
              }
              return (
                <SortableLink
                  key={linkInformation.id}
                  setItems={setItems}
                  linkIndex={i}
                  errorValues={errorValues}
                  handleRemove={handleRemove}
                  updateLinkValues={updateLinkValues}
                  {...linkInformation}
                />
              );
            })}
        </form>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <SortableLinkContainer
            handleRemove={handleRemove}
            linkIndex={1}
            updateLinkValues={updateLinkValues}
            {...(activeItem as LinksDetails)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableContainer;
