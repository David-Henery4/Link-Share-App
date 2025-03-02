import { LinksSection, SaveButton } from "@/components";

export default function Home() {
  //
  return (
    <div className="w-full flex flex-col justify-start items-start max-w-[800px] mx-auto flex-[2] rounded-xl bg-white shadow-2xl laptop:max-w-none laptop:m-0">
      <LinksSection />
      {/* <ProfileSection/> */}
      <SaveButton formId="links-list-form" />
    </div>
  );
}
