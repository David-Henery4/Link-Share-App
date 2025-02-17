"use client";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { LinksDetails, UpdatedPlatformDetails } from "@/types/types"; // ActivePlatformInfo
import { PropsWithChildren, ChangeEvent } from "react";
import linkOptions from "@/local-data/linkOptions";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface AppContextType {
  currentLinksList: LinksDetails[];
  setCurrentLinksList: Dispatch<SetStateAction<LinksDetails[]>>;
  handleAddNewLink: () => void;
  handleRemoveLink: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;

  /////////////////////////////////////////

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
  const router = useRouter();
  const [currentUserDetails, setCurrentUserDetails] = useState<null | User>(
    null
  );
  const [currentLinksList, setCurrentLinksList] = useState<LinksDetails[]>([]);

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

  ///////////////////////////////////////////////////////////////////////////////

  const handleAddNewLink = () => {
    if (!currentUserDetails) return;
    //
    setCurrentLinksList((prevValues) => {
      return [
        ...prevValues,
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
    newValue: string | UpdatedPlatformDetails
  ) => {
    if (valueName === "platform" && typeof newValue !== "string") {
      setCurrentLinksList((prevValues) => {
        return prevValues.map((linkItem) => {
          if (linkId === linkItem.id) {
            return {
              ...linkItem,
              platformId: newValue.platformId,
              platformLabel: newValue.platformLabel,
              platformValue: newValue.platformValue,
              platformColour: newValue.platformColour,
            };
          }
          return linkItem;
        });
      });
      return;
    }

    if (valueName === "url" && typeof newValue === "string") {
      setCurrentLinksList((prevValues) => {
        return prevValues.map((linkItem) => {
          if (linkId === linkItem.id) {
            return {
              ...linkItem,
              url: newValue,
            };
          }
          return linkItem;
        });
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleGetUserData = async () => {
    const { data, error } = await createClient().auth.getUser();
    if (error) {
      setCurrentUserDetails(null);
      router.push("/login");
      return;
    }
    setCurrentUserDetails(data.user);
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

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
