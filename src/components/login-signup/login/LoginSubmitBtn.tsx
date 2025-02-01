import Button from "@/components/reusable/Button";
import { useFormStatus } from "react-dom";

const LoginSubmitBtn = () => {
  const { pending } = useFormStatus();
  //
  return (
    <Button disabled={pending} type="submit" buttonType="primary">
      Login
    </Button>
  );
};

export default LoginSubmitBtn;
