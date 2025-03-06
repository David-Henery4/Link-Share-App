"use client"
import { BaseText } from "../reusable/text";
import Button from "../reusable/Button";
// import Link from "next/link";
import { demoLogin } from "@/login/actions";

const DemoSignIn = () => {
  return (
    <>
      <BaseText className="text-center my-1" size="medium">
        or
      </BaseText>

      <div className="w-full text-center">
        <Button
          buttonType="third"
          className="text-purple hover:text-purpleHover"
          onClick={demoLogin}
        >
          Login with a demo account here
        </Button>
        {/* <Link href="/sign-up" className="text-purple hover:text-purpleHover">
          Sign in with a demo account here
        </Link> */}
      </div>
    </>
  );
}

export default DemoSignIn