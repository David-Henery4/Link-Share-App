import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchLinks, fetchProfileDetails } from "@/query/queryFunctions";
import { PropsWithChildren } from "react";

const HydrateComps = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });
  //
  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: fetchProfileDetails,
  })
  //
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default HydrateComps;
