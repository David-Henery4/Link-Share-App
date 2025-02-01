import HeaderSection from "./reusable/HeaderSection";
import ProfileForm from "./profile-section-comps/ProfileForm";

const ProfileSection = () => {
  return (
    <section className="w-full p-6 lgMob:p-10 mediumTablet:pb-40">
      <HeaderSection
        description="Add your details to create a personal touch to your profile."
        title="Profile Details"
      />
      <ProfileForm />
    </section>
  );
}

export default ProfileSection