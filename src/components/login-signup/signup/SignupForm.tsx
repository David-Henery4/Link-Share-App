"use client"
import Button from "@/components/reusable/Button";
import { BaseText } from "@/components/reusable/text";
import { PasswordIcon, EmailIcon } from "@/components/icons/login";
import { signup } from "@/login/actions";
import { useActionState } from "react";

// Maybe hide password word when typed, and give option to see it

const SignupForm = () => {
  const [state, signupAction] = useActionState(signup, {
    errors: { email: undefined, password: undefined, neutral: undefined, confirmPassword: undefined },
  });
  // console.log();
  const emailError = state?.errors.email ?? null;
  const passwordError = state?.errors.password ?? null;
  const neutralError = state?.errors.neutral ?? null;
  const confirmPasswordError = state?.errors.confirmPassword ?? null;
  //
  return (
    <form action={signupAction} className="w-full mt-10 grid gap-6">
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
            className="w-full outline-none"
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
          Create Password
        </label>
        <div
          className={`w-full px-4 py-3 mt-1 rounded-lg border flex justify-center items-center gap-3 ${
            passwordError ? "border-red" : "border-border"
          }`}
        >
          <PasswordIcon />
          <input
            type="text"
            name="password"
            id="password"
            className="w-full outline-none"
            placeholder="At least .8 characters"
          />
          {passwordError && (
            <BaseText className="text-red" size="small">
              {passwordError}
            </BaseText>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className={`text-xs ${confirmPasswordError ? "text-red" : "text-darkGrey"}`}
        >
          Confirm Password
        </label>
        <div
          className={`w-full px-4 py-3 mt-1 rounded-lg border flex justify-center items-center gap-3 ${
            confirmPasswordError ? "border-red" : "border-border"
          }`}
        >
          <PasswordIcon />
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full outline-none"
            placeholder="At least .8 characters"
          />
          {confirmPasswordError && (
            <BaseText className="text-red" size="small">
              {confirmPasswordError}
            </BaseText>
          )}
        </div>
      </div>

      {neutralError && (
        <BaseText size="small" className="text-red text-center">
          {neutralError}
        </BaseText>
      )}

      <BaseText size="small">
        Password must contain at least 8 characters
      </BaseText>

      <Button buttonType="primary">Create new account</Button>
    </form>
  );
};

export default SignupForm;
