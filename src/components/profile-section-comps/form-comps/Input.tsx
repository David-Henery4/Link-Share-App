"use client"
import useGlobalContext from "@/context/useGlobalContext";

interface InputTypes {
  id: "firstName" | "lastName" | "email";
  label: string;
}

const Input = ({ id, label }: InputTypes) => {
  const {profileDetails, handleUpdateProfileDetails} = useGlobalContext()
  //
  return (
    <div className="w-full smallTablet:gap-10 smallTablet:grid smallTablet:grid-cols-formColumns lgLaptop:gap-20">
      <label
        className="text-xs text-darkGrey font-normal smallTablet:text-base smallTablet:text-grey smallTablet:inline-flex smallTablet:justify-start smallTablet:items-center"
        htmlFor={id}
      >
        {label}*
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={profileDetails[id]}
        onChange={(e) => {
          handleUpdateProfileDetails(id, e.currentTarget.value)
        }}
        className="w-full rounded-lg mt-1 px-4 py-3 border border-border bg-white outline-none text-darkGrey text-base font-normal"
      />
    </div>
  );
};

export default Input;
