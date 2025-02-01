import MobilePreviewContainer from "./MobilePreviewContainer";

const MobilePreviewSection = () => {
  return (
    // Shadow is temp for development
    <div className="w-full px-6 py-24 place-items-center items-start flex-[1] rounded-xl bg-white shadow-2xl hidden laptop:grid">
      <MobilePreviewContainer />
    </div>
  );
}

export default MobilePreviewSection