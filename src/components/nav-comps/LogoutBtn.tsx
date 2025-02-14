"use client"
import { logout } from "@/login/actions";

const LogoutBtn = () => {
  // 
  return (
    <button
      className="ml-auto text-base font-semibold text-purple hover:text-purpleHover"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
