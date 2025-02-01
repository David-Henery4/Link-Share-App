import { LogoLarge, LogoSmall } from "../icons";

const NavLogo = () => {
  return (
    <div className="mr-5 flex-[1] tablet:m-0">
      <LogoSmall/>
      <LogoLarge/>
    </div>
  );
}

export default NavLogo