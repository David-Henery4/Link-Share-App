import HeaderSection from "./reusable/HeaderSection";
import { LinksContainer } from "./link-section-comps";
import { createClient } from "@/utils/server";

const LinksSection = async () => {
  const supabase = await createClient()
  const {data: {user}} = await supabase.auth.getUser()
  //
  return (
    <section className="w-full p-6 lgMob:p-10">
      <HeaderSection
        description="Add/edit/remove links below and then share all your profiles with
            the world!"
        title="Customize your links"
      />
      <LinksContainer currentUserId={user?.id}/>
    </section>
  );
};

export default LinksSection;
