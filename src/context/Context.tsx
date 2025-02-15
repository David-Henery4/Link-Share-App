"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { LinksInfo } from "@/types/types";
import { PropsWithChildren, ChangeEvent } from "react";
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
  handleCheckImageUploadSize: (e: ChangeEvent<HTMLInputElement>) => void;
  currentUpload: string | null;
  isImageDimensionsInvalid: boolean;
  handleUpdateProfileDetails: (
    detailName: "firstName" | "lastName" | "email",
    detailValue: string
  ) => void;
  profileDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = (props: PropsWithChildren) => {
  const [currentLinksList, setCurrentLinksList] = useState<LinksInfo[]>([]);

  // list of linkIds to be deleted when save button is clicked
  // const [linksToBeDeleted, setLinksToBeDeleted] = useState([])
  //
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
  const [isImageDimensionsInvalid, setIsImageDimensionsInvalid] =
    useState(false);
  //
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  //
  const handleUpdateProfileDetails = (
    detailName: "firstName" | "lastName" | "email",
    detailValue: string
  ) => {
    setProfileDetails((prev) => {
      return {
        ...prev,
        [detailName]: detailValue,
      };
    });
  };
  //
  const handleSetFileState = (e: FileList) => {
    if (!e) return;
    const reader = new FileReader();

    reader.onload = () => {
      setCurrentUpload(
        typeof reader.result === "string" ? reader.result : null
      );
    };

    reader.onerror = function (event) {
      if (event.target) {
        console.log("Error reading file:", event.target.error);
      }
      return;
    };

    reader.readAsDataURL(e[0]);
  };
  //
  const handleCheckImageUploadSize = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget?.files;
    if (!file) return;
    //
    const img = new Image();
    img.src = window.URL.createObjectURL(file[0]);
    img.onload = () => {
      if (img.naturalHeight > 1024 || img.naturalWidth > 1024) {
        setIsImageDimensionsInvalid(true);
        window.URL.revokeObjectURL(img.src);
        return;
      }
      setIsImageDimensionsInvalid(false);
      window.URL.revokeObjectURL(img.src);
      handleSetFileState(file);
    };
  };
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
        handleCheckImageUploadSize,
        currentUpload,
        isImageDimensionsInvalid,
        profileDetails,
        handleUpdateProfileDetails,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
