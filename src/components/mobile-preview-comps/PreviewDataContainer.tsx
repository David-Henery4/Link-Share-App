
import { MobilePreviewHeader, MobilePreviewLinksList } from "./preview-container-comps";

const PreviewDataContainer = () => {
  //
  return (
    <div className="absolute top-0 left-0 h-full w-full px-9 pt-16 pb-[54px] grid gap-[50px] grid-rows-mobilePreviewRows">

      <MobilePreviewHeader/>

      <MobilePreviewLinksList/>

    </div>
  );
};

export default PreviewDataContainer;
