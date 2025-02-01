import Button from "@/components/reusable/Button";
import { BaseText } from "@/components/reusable/text";
import { PasswordIcon, EmailIcon } from "@/components/icons/login";

const SignupForm = () => {
  return (
    <form action="" className="w-full mt-10 grid gap-6">
      <div>
        <label htmlFor="email" className="text-xs text-darkGrey">
          Email Address
        </label>
        <div className="w-full px-4 py-3 mt-1 rounded-lg border border-border flex justify-center items-center gap-3">
          <EmailIcon />
          <input
            type="text"
            name="email"
            id="email"
            className="w-full outline-none"
            placeholder="e.g. alex@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="create-password" className="text-xs text-darkGrey">
          Create Password
        </label>
        <div className="w-full px-4 py-3 mt-1 rounded-lg border border-border flex justify-center items-center gap-3">
          <PasswordIcon />
          <input
            type="text"
            name="create-password"
            id="create-password"
            className="w-full outline-none"
            placeholder="At least .8 characters"
          />
        </div>
      </div>
      <div>
        <label htmlFor="confirm-password" className="text-xs text-darkGrey">
          Confirm Password
        </label>
        <div className="w-full px-4 py-3 mt-1 rounded-lg border border-border flex justify-center items-center gap-3">
          <PasswordIcon />
          <input
            type="text"
            name="confirm-password"
            id="confirm-password"
            className="w-full outline-none"
            placeholder="At least .8 characters"
          />
        </div>
      </div>

      <BaseText size="small">
        Password must contain at least 8 characters
      </BaseText>

      <Button buttonType="primary">Create new account</Button>
    </form>
  );
};

export default SignupForm;
