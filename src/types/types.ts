import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import { SetStateAction, Dispatch, ButtonHTMLAttributes } from "react";

export interface ActivePlatformInfo {
  id: string;
  label: string;
  value: string;
  icon?: ({ isPreview }: { isPreview?: boolean | undefined }) => JSX.Element;
  color: string;
}

export interface UpdatedPlatformDetails {
  platformId: string;
  platformLabel: string;
  platformValue: string;
  platformColour: string;
}

export interface LinksInfo {
  id: string;
  platform: ActivePlatformInfo;
  url: string;
}

export interface LinksDetails {
  id: string;
  userId: string;
  url: string;
  orderNumber: number;
  platformId: string;
  platformLabel: string;
  platformValue: string;
  platformColour: string;
}

export interface SelectInputProps {
  activePlatform: {
    id: LinksDetails["id"];
    label: LinksDetails["platformLabel"];
    value: LinksDetails["platformValue"];
  };
  id: string;
}

export interface LinkErrorDetails {
  id: string | undefined;
  url: string[] | undefined;
}

export interface LinkErrorsList {
  errors: LinkErrorDetails[];
  isNoList: boolean;
  isSuccess: boolean;
}

export interface ProfileDetails {
  id: string;
  userId: string;
  userEmail: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
}

export interface SortableContainerProps {
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
  linksListData: LinksDetails[];
  deletedList: LinksDetails[] | [];
}

export interface DnDTypes {
  listeners?: SyntheticListenerMap;
  style?: {
    transform: string | undefined;
    transition: string | undefined;
  };
  setNodeRef?: (node: HTMLElement | null) => void;
  setActivatorNodeRef?: (node: HTMLElement | null) => void;
}

export type ActiveIdState = UniqueIdentifier | null;

export interface LinksPropsAndItemsList extends LinksDetails {
  setItems: Dispatch<SetStateAction<LinksDetails[]>>;
  linkIndex: number;
  errorValues?: LinkErrorDetails;
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

type DndAndListTypes = LinksDetails & DnDTypes;

export interface LinkContainerProps extends DndAndListTypes {
  linkIndex: number;
  errorValues?: LinkErrorDetails;
  handleRemove: (id: string) => void;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

export interface TempSelect extends SelectInputProps {
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
  orderNumber: number;
}

export interface UrlInputProps {
  id: string;
  url: string;
  errorValues?: LinkErrorDetails;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

export interface TabTypes {
  label: "links" | "profile details" | "preview";
  path: "/" | "/profile-details" | `/preview/${string}`;
}

export interface InputTypes {
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
  userInfo?: { id: string | undefined; email: string | undefined };
}

export interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "third";
  size?: "large" | "secondarySmall";
  isLink?: boolean;
  href?: string;
}