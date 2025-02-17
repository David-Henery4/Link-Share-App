import { ChevIcon } from "@/components/icons";
import linkOptions from "@/local-data/linkOptions";
import { SelectInputProps } from "@/types/types";
import { MouseEvent, useState } from "react";
import { ActivePlatformInfo } from "@/types/types";
import useGlobalContext from "@/context/useGlobalContext";
import DynamicIcon from "@/components/icons/link-icons/DynamicIcon";

const SelectInput = ({ activePlatform, id }: SelectInputProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { updateLinkValues } = useGlobalContext();
  //
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsDropdownOpen(!isDropdownOpen);
    e.preventDefault();
  };
  //
  const handleSelectItemClick = (option: ActivePlatformInfo) => {
    const updatedPlatformValues = {
      platformId: option.id,
      platformLabel: option.label,
      platformValue: option.value,
      platformColour: option.color
    }
    // console.log(option)
    setIsDropdownOpen(!isDropdownOpen);
    updateLinkValues(id, "platform", updatedPlatformValues);
  };
  //
  return (
    <div className="relative w-full mt-1 flex flex-col">
      <div className="w-full">
        <p>Platform</p>

        {/* Select Dropdown Toggle */}
        <button
          className="group relative w-full inline-flex justify-between items-center gap-3 mt-1 px-4 py-3 rounded-lg border border-border outline-none hover:cursor-pointer hover:border-purple hover:shadow-basicPurple"
          onClick={handleButtonClick}
        >
          <span className="">
            <DynamicIcon activePlatformId={activePlatform.id} />
          </span>
          <p className="mr-auto group-hover:text-purple">
            {activePlatform.label}
          </p>
          <span className="">
            <ChevIcon />
          </span>
        </button>
      </div>

      {/* Dropdown Options */}
      <ul
        className={`absolute h-[200%] overflow-auto top-[110%] left-0 z-10 w-full px-4 rounded-lg border border-border bg-white ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        {linkOptions.map((option) => {
          return (
            <li
              className="relative group flex justify-start items-center py-3 gap-3 border-b border-border fill-purple"
              key={option?.id}
              onClick={() => handleSelectItemClick(option)}
            >
              <span>
                <option.icon />
              </span>
              <input
                defaultChecked={option.value === activePlatform.value}
                className="w-full h-full absolute top-0 left-0 opacity-0 hover:cursor-pointer"
                type="radio"
                name={`platform-${id}`}
                id={`${option.value}-${option.id}`}
                value={option.value}
              />
              <label
                htmlFor={`${option.value}-${option.id}`}
                className="pointer-events-none group-hover:text-purple"
              >
                {option?.label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectInput;
