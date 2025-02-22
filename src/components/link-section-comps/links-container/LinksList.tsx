"use client";
import LinkContainer from "./links/LinkContainer";
import useGlobalContext from "@/context/useGlobalContext";
import { createLinks } from "@/db/queries/actions";
import { useActionState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "@/query/queryFunctions";

const LinksList = () => {
  const { currentLinksList } = useGlobalContext();
  // const queryClient = useQueryClient();
  const [state, linksAction] = useActionState(
    createLinks.bind(null, currentLinksList),
    {
      errors: [
        {
          id: undefined,
          url: undefined,
        },
      ],
    }
  );
  const { data, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: () => fetchLinks(),
    // staleTime: Infinity
  });
  console.log("LinksList data", data);
  //
  return (
    <form
      id="links-list-form"
      className="w-full my-6 flex flex-col justify-center items-center gap-6"
      action={linksAction}
    >
      {isSuccess && data.map((linkInformation, i) => {
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
            {...linkInformation}
          />
        );
      })}
    </form>
  );
};

export default LinksList;
