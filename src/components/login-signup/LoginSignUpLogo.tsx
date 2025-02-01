import { LogoLarge } from "../icons";

const LoginSignUpLogo = () => {
  return (
    <section className="w-full smallTablet:flex smallTablet:justify-center">
      <LogoLarge isLoginPage={true} />
    </section>
  );
}

export default LoginSignUpLogo