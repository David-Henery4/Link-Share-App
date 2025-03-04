"use client";
import { useState, createContext, useEffect } from "react";
import { PropsWithChildren, ChangeEvent } from "react";
import { createClient } from "@/utils/client";
import { useRouter } from "next/navigation";

interface AppContextType {
  handleCheckImageUploadSize: (e: ChangeEvent<HTMLInputElement>) => void;
  currentUpload: string | null;
  isImageDimensionsInvalid: boolean;
}

// currentUpload,
// handleCheckImageUploadSize,
// isImageDimensionsInvalid,

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = (props: PropsWithChildren) => {
  const router = useRouter();
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
  const [isImageDimensionsInvalid, setIsImageDimensionsInvalid] =
    useState(false);
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
  const handleGetUserData = async () => {
    // Might not need (Might be set in component or middleware)
    const { error } = await createClient().auth.getUser();
    if (error) {
      router.push("/login");
      return;
    }
  };
  //
  useEffect(() => {
    handleGetUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //
  return (
    <AppContext.Provider
      value={{
        handleCheckImageUploadSize,
        currentUpload,
        isImageDimensionsInvalid,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
