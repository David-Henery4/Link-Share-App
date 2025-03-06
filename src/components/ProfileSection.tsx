import HeaderSection from "./reusable/HeaderSection";
import ProfileForm from "./profile-section-comps/ProfileForm";
import { createClient } from "@/utils/server";

const ProfileSection = async () => {
  const supabase = await createClient()
  const {data: {user}} = await supabase.auth.getUser()
  return (
    <section className="w-full p-6 lgMob:p-10 mediumTablet:pb-40">
      <HeaderSection
        description="Add your details to create a personal touch to your profile."
        title="Profile Details"
      />
      <ProfileForm userInfo={{id: user?.id, email: user?.email}} />
    </section>
  );
}

export default ProfileSection