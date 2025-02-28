"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchProfileDetails } from "@/query/queryFunctions";

const MockupNames = () => {
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfileDetails(),
    // staleTime: Infinity
  });
  //
  return (
    <>
      {(profileData?.firstName || profileData?.lastName) || 
        <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
      }
      {!profileData?.userEmail && (
        <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
      )}
    </>
  );
}

export default MockupNames