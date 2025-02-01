"use client";
import Button from "../reusable/Button";
import LinksList from "./links-container/LinksList";
import EmptyContainer from "./links-container/EmptyContainer";
import linkOptions from "@/local-data/linkOptions";
import useGlobalContext from "@/context/useGlobalContext";

const LinksContainer = () => {
  const { handleAddNewLink, currentLinksList } = useGlobalContext();
  //
  return (
    <div className="w-full mt-10">
      <Button
        disabled={currentLinksList.length >= linkOptions.length}
        buttonType="secondary"
        size="large"
        onClick={handleAddNewLink}
      >
        + Add new link
      </Button>
      {currentLinksList.length <= 0 ? <EmptyContainer /> : <LinksList />}
    </div>
  );
};

export default LinksContainer;
