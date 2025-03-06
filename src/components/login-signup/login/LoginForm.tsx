"use client";
import {
  // PasswordIcon,
  EmailIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@/components/icons/login";
import { useActionState, useState } from "react";
import { login } from "@/login/actions";
import LoginSubmitBtn from "./LoginSubmitBtn";
import { BaseText } from "@/components/reusable/text";

// NEED TO ADD PASSWORD ICONS TO SIGN-IN NOW AS WELL 

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [state, loginAction] = useActionState(login, {
    errors: { email: undefined, password: undefined, neutral: undefined },
  });
  //
  const emailError = state?.errors.email ?? null;
  const passwordError = state?.errors.password ?? null;
  //
  const passwordVisibilityToggle = () =>
    setIsPasswordVisible(!isPasswordVisible);
  //
  return (
    <form action={loginAction} className="w-full mt-10 grid gap-6">
      <div>
        <label
          htmlFor="email"
          className={`text-xs ${emailError ? "text-red" : "text-darkGrey"}`}
        >
          Email Address
        </label>
        <div
          className={`w-full px-4 py-3 mt-1 rounded-lg border flex justify-center items-center gap-3 ${
            emailError ? "border-red" : "border-border"
          }`}
        >
          <EmailIcon />
          <input
            type="text"
            name="email"
            id="email"
            className="w-full outline-none flex-1"
            placeholder="e.g. alex@email.com"
          />
          {emailError && (
            <BaseText className="text-red" size="small">
              {emailError}
            </BaseText>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className={`text-xs ${passwordError ? "text-red" : "text-darkGrey"}`}
        >
          Password
        </label>
        <div
          className={`w-full px-4 py-3 mt-1 rounded-lg border flex justify-center items-center gap-3 ${
            passwordError ? "border-red" : "border-border"
          }`}
        >
          {isPasswordVisible ? (
            <span
              className="hover:cursor-pointer"
              onClick={passwordVisibilityToggle}
            >
              <EyeOpenIcon />
            </span>
          ) : (
            <span
              className="hover:cursor-pointer"
              onClick={passwordVisibilityToggle}
            >
              <EyeClosedIcon />
            </span>
          )}
          {/* <PasswordIcon /> */}
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            id="password"
            className="w-full outline-none flex-1"
            placeholder="Enter your password"
          />
          {passwordError && (
            <BaseText className="text-red" size="small">
              {passwordError}
            </BaseText>
          )}
        </div>
      </div>
      {state?.errors.neutral && (
        <BaseText size="small" className="text-red text-center">
          {state?.errors.neutral}
        </BaseText>
      )}
      <LoginSubmitBtn />
    </form>
  );
};

export default LoginForm;
