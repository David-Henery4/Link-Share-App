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

// export interface SelectInputProps {
//   activePlatform: ActivePlatformInfo;
//   id: string;
// }

export interface LinksDetails {
  id: string;
  url: string;
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
