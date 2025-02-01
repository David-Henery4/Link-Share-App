import HeaderSection from "./reusable/HeaderSection";
import { LinksContainer } from "./link-section-comps";


const LinksSection = () => {
  return (
    <section className="w-full p-6 lgMob:p-10">
      <HeaderSection
        description="Add/edit/remove links below and then share all your profiles with
            the world!"
        title="Customize your links"
      />
      <LinksContainer/>
    </section>
  );
};

export default LinksSection;
