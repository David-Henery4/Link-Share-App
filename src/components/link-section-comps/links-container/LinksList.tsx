"use client";
import LinkContainer from "./links/LinkContainer";
import useGlobalContext from "@/context/useGlobalContext";
import { createLinks } from "@/db/queries/actions";
import { useActionState, useEffect } from "react";

// id: string;
// userId: string;
// url: string;
// platformId: string;
// platformLabel: string;
// platformValue: string;
// platformColour: string;

const LinksList = () => {
  const { currentLinksList } = useGlobalContext();
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
  useEffect(() => {
    console.log("State: ", state);
  }, [state]);
  //
  return (
    <form
      id="links-list-form"
      className="w-full my-6 flex flex-col justify-center items-center gap-6"
      action={linksAction}
    >
      {currentLinksList.map((linkInformation, i) => {
        let errorValues;
        if (state?.errors) {
          errorValues = state.errors.find(
            (err) => err.id === linkInformation.id
          );
        }
        console.log("errorValues: ", errorValues);
        return <LinkContainer key={i} linkIndex={i} errorValues={errorValues} {...linkInformation} />;
      })}
    </form>
  );
};

export default LinksList;
