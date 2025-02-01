export interface ActivePlatformInfo {
  id: number;
  label: string;
  value: string;
  icon: ({ isPreview }: { isPreview?: boolean | undefined }) => JSX.Element;
  color: string;
}

export interface LinksInfo {
  id: string;
  platform: ActivePlatformInfo;
  url: string;
}

export interface SelectInputProps {
  activePlatform: ActivePlatformInfo;
  id: string;
}
