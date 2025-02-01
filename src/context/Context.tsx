"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { LinksInfo } from "@/types/types";
import { PropsWithChildren } from "react";
import linkOptions from "@/local-data/linkOptions";
import { v4 as uuidv4 } from "uuid";
import { ActivePlatformInfo } from "@/types/types";

interface AppContextType {
  currentLinksList: LinksInfo[];
  setCurrentLinksList: Dispatch<SetStateAction<LinksInfo[]>>;
  handleAddNewLink: () => void;
  handleRemoveLink: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | ActivePlatformInfo
  ) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = (props: PropsWithChildren) => {
  const [currentLinksList, setCurrentLinksList] = useState<LinksInfo[]>([]);
  //
  const handleAddNewLink = () => {
    setCurrentLinksList((prevValues) => {
      return [
        ...prevValues,
        {
          id: uuidv4(),
          platform: linkOptions[0],
          url: "",
        },
      ];
    });
  };
  //
  const handleRemoveLink = (id: string) => {
    setCurrentLinksList((prevValues) => {
      return prevValues.filter((item) => id !== item.id);
    });
  };
  //
  const updateLinkValues = (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | ActivePlatformInfo
  ) => {
    setCurrentLinksList((prevValues) => {
      const newArray = prevValues.map((linkItem) => {
        if (linkId === linkItem.id) {
          return {
            ...linkItem,
            [valueName]: newValue,
          };
        }
        return linkItem;
      });

      return newArray;
    });
  };
  //
  return (
    <AppContext.Provider
      value={{
        currentLinksList,
        setCurrentLinksList,
        handleAddNewLink,
        handleRemoveLink,
        updateLinkValues,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
