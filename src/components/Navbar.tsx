import { NavLogo, Tab, LogoutBtn } from "./nav-comps";
import { createClient } from "@/utils/server";
// import Button from "./reusable/Button";
// import { PreviewEyeIcon } from "./icons";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //
  return (
    <nav className="w-full mediumTablet:p-6">
      {/* Shadow is temp for development */}
      <div className="w-full px-6 py-4 flex justify-between items-center bg-white mediumTablet:rounded-xl mediumTablet:shadow-2xl">
        <NavLogo />
        <div className="w-full flex justify-center items-center gap-2 flex-[6] smMob:gap-6 lgMob:gap-8 smallTablet:gap-12 mediumTablet:gap-6">
          <Tab label="links" path="/" />
          <Tab label="profile details" path="/profile-details" />
          <Tab label="preview" path={`/preview/${user?.id}`} />
        </div>
        <div className="flex-[1] flex">
          <LogoutBtn />
        </div>
        {/* <Button buttonType="secondary" size="secondarySmall" isLink={true} href="/preview">
          <span className="text-base font-semibold hidden tablet:block">
            Preview
          </span>
        </Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
