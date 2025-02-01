import { useContext } from "react";
import { AppContext } from "./Context";

const useGlobalContext = () => {
  const CurrentAppContext = useContext(AppContext);
  if (!CurrentAppContext){
    throw new Error(
      "CurrentAppContext has to be used within <AppContext.Provider>"
    );
  }
  return CurrentAppContext
}

export default useGlobalContext