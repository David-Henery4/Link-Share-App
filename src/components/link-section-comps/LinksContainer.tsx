"use client";
import Button from "../reusable/Button";
import LinksList from "./links-container/LinksList";
import EmptyContainer from "./links-container/EmptyContainer";
import linkOptions from "@/local-data/linkOptions";
import useGlobalContext from "@/context/useGlobalContext";
//
import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "@/query/queryFunctions";
// import { QueryClient } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { listOptions } from "@/query/queryFunctions";
import { LinksDetails } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

const LinksContainer = () => {
  const {  currentUserDetails } = useGlobalContext();
  // const { data } = useSuspenseQuery(listOptions);
  // console.log("Checking data: ", data);
  const queryClient = useQueryClient();
  // // console.log(queryClient)
  // // const queryClient = new QueryClient();
  // const mainLinkList: LinksDetails[] | undefined = queryClient.getQueryData(["links"])
  // //
  const { data, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: () => fetchLinks(),
    // staleTime: Infinity,
  })
  console.log("LinksContainer Data ", data);
  //
  const handleAddNew = () => {

    // if (!currentUserDetails) return;
    // //
    queryClient.setQueryData(["links"], (links: LinksDetails[]) => {
      return [
        ...links,
        {
          id: uuidv4(),
          url: "",
          userId: currentUserDetails?.id,
          platformId: linkOptions[0].id,
          platformValue: linkOptions[0].value,
          platformLabel: linkOptions[0].label,
          platformColour: linkOptions[0].color,
        },
      ];
    });
    // console.log(queryClient.getQueryData(["links"]));
  }
  //
  return (
    <div className="w-full mt-10">
      <Button
        disabled={isSuccess && data.length >= linkOptions.length}
        buttonType="secondary"
        size="large"
        onClick={handleAddNew}
        // onClick={handleAddNewLink}
      >
        + Add new link
      </Button>
      {isSuccess && data.length <= 0 ? (
        <EmptyContainer />
      ) : (
        <LinksList />
      )}
    </div>
  );
};

export default LinksContainer;
