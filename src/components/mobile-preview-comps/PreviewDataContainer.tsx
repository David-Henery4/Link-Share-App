"use client"
import {
  MobilePreviewHeader,
  MobilePreviewLinksList,
} from "./preview-container-comps";
import { useQuery } from "@tanstack/react-query";
import { fetchLinks, fetchProfileDetails } from "@/query/queryFunctions";

const PreviewDataContainer = () => {
  const { data: linksData, isSuccess: isLinksSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: () => fetchLinks(),
    // staleTime: Infinity
  });
  const { data: profileData} = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfileDetails(),
    // staleTime: Infinity
  });
  //
  return (
    <div className="absolute top-0 left-0 h-full w-full px-9 pt-16 pb-[54px] grid gap-[50px] grid-rows-mobilePreviewRows">
      <MobilePreviewHeader profileData={profileData} />

      {isLinksSuccess && linksData && (
        <MobilePreviewLinksList previewLinksList={linksData} />
      )}
    </div>
  );
};

export default PreviewDataContainer;
