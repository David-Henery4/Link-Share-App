"use client";
import { ProfileImageUpload, Input } from "./form-comps";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProfileDetails } from "@/query/queryFunctions";
import { useActionState, useEffect } from "react";
import { ProfileDetails } from "@/types/types";
import { handleProfileDetailsUpdate } from "@/db/queries/actions";
import { useToast } from "@/hooks/use-toast";

const ProfileForm = () => {
  const { toast } = useToast();
  const [profileState, profileAction] = useActionState(
    handleProfileDetailsUpdate,
    {
      errors: {
        firstName: undefined,
        lastName: undefined,
        userEmail: undefined,
      },
      success: {
        isSuccess: undefined,
        successMsg: undefined,
        errorMsg: undefined,
      },
    }
  );
  //
  const queryClient = useQueryClient();
  //
  const { data, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfileDetails(),
    // staleTime: Infinity,
  });
  //
  const handleLocalProfileUpdate = (
    detailName: "firstName" | "lastName" | "userEmail",
    detailValue: string
  ) => {
    queryClient.setQueryData(
      ["profile"],
      (profileDetails: ProfileDetails): ProfileDetails => {
        return {
          ...profileDetails,
          [detailName]: detailValue,
        };
      }
    );
  };
  // EMAIL HAS TO BE UPDATED IN AUTH & PROFILE DETAILS
  //
  useEffect(() => {
    if (profileState?.success && profileState.success.isSuccess){
      toast({
        title: "Saved!",
        description: profileState.success.successMsg
      })
    }
    if (profileState?.success && !profileState.success.isSuccess){
      toast({
        title: "Error!",
        description: profileState.success.errorMsg
      })
    }
  }, [profileState]);
  //
  return (
    <form id="profile-details" action={profileAction} className="w-full mt-10">
      <ProfileImageUpload />
      <div className="w-full mt-6 grid gap-3 p-5 bg-lightGrey rounded-xl">
        {isSuccess && data && (
          <>
            <Input
              id="firstName"
              label="First Name"
              details={data}
              handleLocalProfileUpdate={handleLocalProfileUpdate}
              errorMsg={profileState?.errors.firstName}
            />
            <Input
              id="lastName"
              label="Last Name"
              details={data}
              handleLocalProfileUpdate={handleLocalProfileUpdate}
              errorMsg={profileState?.errors.lastName}
            />
            <Input
              id="userEmail"
              label="Email"
              details={data}
              handleLocalProfileUpdate={handleLocalProfileUpdate}
              errorMsg={profileState?.errors.userEmail}
            />
          </>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
