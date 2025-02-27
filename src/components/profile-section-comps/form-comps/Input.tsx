"use client";
import { BaseText } from "@/components/reusable/text";

interface InputTypes {
  id: "firstName" | "lastName" | "userEmail";
  label: string;
  handleLocalProfileUpdate: (
    detailName: "firstName" | "lastName" | "userEmail",
    detailValue: string
  ) => void;
  details: {
    id: string;
    userId: string;
    userEmail: string;
    firstName: string | null;
    lastName: string | null;
    profilePicture: string | null;
  };
  errorMsg: string[] | undefined;
}

const Input = ({
  id,
  label,
  handleLocalProfileUpdate,
  details,
  errorMsg,
}: InputTypes) => {
  //
  return (
    <div className="w-full smallTablet:gap-10 smallTablet:grid smallTablet:grid-cols-formColumns lgLaptop:gap-20">
      <label
        className="text-xs text-darkGrey font-normal smallTablet:text-base smallTablet:text-grey smallTablet:inline-flex smallTablet:justify-start smallTablet:items-center"
        htmlFor={id}
      >
        {label}*
      </label>
      <div className={`w-full rounded-lg mt-1 px-4 py-3 overflow-hidden border bg-white flex justify-start items-center gap-2 ${errorMsg ? "border-red" : "border-border"}`}>
        <input
          type="text"
          id={id}
          name={id}
          value={details[id] === null ? "" : details[id]}
          onChange={(e) => {
            handleLocalProfileUpdate(id, e.currentTarget.value);
          }}
          className="w-full outline-none text-darkGrey text-base font-normal flex-1"
        />
        {errorMsg && <BaseText size="small" className="text-red">{errorMsg[0]}</BaseText>}
      </div>
    </div>
  );
};

export default Input;
