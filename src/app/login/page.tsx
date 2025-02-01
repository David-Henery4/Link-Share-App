import { Heading, BaseText } from "@/components/reusable/text";
import Link from "next/link";
import LoginSignUpLogo from "@/components/login-signup/LoginSignUpLogo";
import LoginForm from "@/components/login-signup/login/LoginForm";

// Need to change the padding for the form so it reaches the max of 476px

const LoginPage = () => {
  return (
    <main className="w-full px-6 py-8 max-w-[476px] mx-auto smallTablet:px-0 tablet:py-44">
      <LoginSignUpLogo />

      <section className="w-full mt-16 mediumTablet:bg-white mediumTablet:p-10 mediumTablet:rounded-xl mediumTablet:shadow-card">
        <div>
          <Heading size="small">Login</Heading>
          <BaseText size="medium" className="mt-2">
            Add your details below to get back into the app
          </BaseText>
        </div>

        <LoginForm />

        <div className="w-full mt-6 text-center">
          <BaseText size="medium">Don’t have an account?</BaseText>
          <Link href="/sign-up" className="text-purple hover:text-purpleHover">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
