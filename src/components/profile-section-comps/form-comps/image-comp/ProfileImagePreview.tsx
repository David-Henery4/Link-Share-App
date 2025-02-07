import Image from "next/image";

const ProfileImagePreview = ({ currentUpload }: { currentUpload: string }) => {
  return (
    <>
      <Image
        width={1024}
        height={1024}
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        src={currentUpload}
        alt=""
        // onLoad={handleRevoke}
      />
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-black/50"></div>
    </>
  );
};

export default ProfileImagePreview;
