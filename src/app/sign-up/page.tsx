import { Heading, BaseText } from "@/components/reusable/text";
import Link from "next/link";
import LoginSignUpLogo from "@/components/login-signup/LoginSignUpLogo";
import SignupForm from "@/components/login-signup/signup/SignupForm";

const SignupPage = () => {
  return (
    <main className="w-full px-6 py-8 max-w-[476px] mx-auto smallTablet:px-0 tablet:py-44">
      <LoginSignUpLogo />

      <section className="w-full mt-16 mediumTablet:bg-white mediumTablet:p-10 mediumTablet:rounded-xl mediumTablet:shadow-card">
        <div>
          <Heading size="small">Create Account</Heading>
          <BaseText size="medium" className="mt-2">
            Let’s get you started sharing your links!
          </BaseText>
        </div>

        <SignupForm />

        <div className="w-full mt-6 text-center">
          <BaseText size="medium">Already have an account?</BaseText>
          <Link href="/login" className="text-purple hover:text-purpleHover">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
