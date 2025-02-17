import {
  // Navbar,
  LinksSection,
  // ProfileSection,
  // MobilePreviewSection,
  SaveButton,
} from "@/components";
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/server";
// import { platformTable } from "@/db/schemas/linksSchema";
// import { db } from "@/db";

export default async function Home() {
  // Might have to move to layout (Might not need because its being done in middleware)

  // const supabase = createClient()
  // const {data, error} = await (await supabase).auth.getUser()
  // // console.log(data)
  // //
  // if (error || !data?.user){
  //   redirect("/login")
  // }

  // TESTING
  // const platforms = await db.select().from(platformTable)
  // console.log(platforms)

  //
  return (
    <div className="w-full flex flex-col justify-start items-start max-w-[800px] mx-auto flex-[2] rounded-xl bg-white shadow-2xl laptop:max-w-none laptop:m-0">
      <LinksSection />
      {/* <ProfileSection/> */}
      <SaveButton formId="links-list-form" />
    </div>
  );
}
