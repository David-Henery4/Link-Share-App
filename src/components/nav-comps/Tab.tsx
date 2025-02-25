"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinksTabIcon, ProfileDetailsHeaderIcon, PreviewEyeIcon } from "../icons";

interface TabTypes {
  label: "links" | "profile details" | "preview";
  path: "/" | "/profile-details" | `/preview/${string}`;
}

const Tab = ({ label, path }: TabTypes) => {
  const pathname = usePathname()
  //
  return (
    <Link
      href={path}
      aria-label={label}
      className={`px-2 py-2 rounded-lg group font-bold inline-flex justify-center items-center flex-row-reverse gap-2 hover:text-purple ${
        pathname === path ? "bg-purpleLight text-purple" : "text-grey"
      }`}
    >
      <span className="capitalize hidden group-hover:text-purple mediumTablet:block">
        {label}
      </span>
      <span>
        {path === "/profile-details" ? (
          <ProfileDetailsHeaderIcon
            currentColour={`${pathname === path ? "fill-purple" : "fill-grey"}`}
          />
        ) : path === "/" ? (
          <LinksTabIcon
            currentColour={`${pathname === path ? "fill-purple" : "fill-grey"}`}
          />
        ) : (
          <PreviewEyeIcon
            currentColour={`${pathname === path ? "fill-purple" : "fill-grey"}`}
          />
        )}
      </span>
    </Link>
  );
};

export default Tab;
