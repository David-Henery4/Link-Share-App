"use client"
import useGlobalContext from "@/context/useGlobalContext";

const MockupNames = () => {
  const {profileDetails} = useGlobalContext()
  //
  return (
    <>
      {(profileDetails?.firstName || profileDetails?.lastName) || 
        <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
      }
      {!profileDetails.email && (
        <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
      )}
    </>
  );
}

export default MockupNames