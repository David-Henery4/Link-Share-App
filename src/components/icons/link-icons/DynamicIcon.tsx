import linkOptions from "@/local-data/linkOptions"

const DynamicIcon = ({
  activePlatformId,
  isPreview
}: {
  activePlatformId: string;
  isPreview?: boolean;
}) => {
  const newIcon = linkOptions.find((item) => item.id === activePlatformId);
  if (!newIcon?.icon) return <div>I</div>;
  return <newIcon.icon isPreview={isPreview} />;
};

export default DynamicIcon