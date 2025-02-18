"use client";
import LinkContainer from "./links/LinkContainer";
import useGlobalContext from "@/context/useGlobalContext";
import { createLinks } from "@/db/queries/actions";
import { useActionState } from "react";

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
