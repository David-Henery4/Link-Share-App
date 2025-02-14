import {
  // Navbar,
  LinksSection,
  // ProfileSection,
  // MobilePreviewSection,
  SaveButton,
} from "@/components";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/server";

export default async function Home() {
  // Might have to move to layout
  const supabase = createClient()
  const {data, error} = await (await supabase).auth.getUser()
  // console.log(data)
  //
  if (error || !data?.user){
    redirect("/login")
  }
  //
  return (
    <div className="w-full flex flex-col justify-start items-start max-w-[800px] mx-auto flex-[2] rounded-xl bg-white shadow-2xl laptop:max-w-none laptop:m-0">
      <LinksSection />
      {/* <ProfileSection/> */}
      <SaveButton />
    </div>
  );
}
