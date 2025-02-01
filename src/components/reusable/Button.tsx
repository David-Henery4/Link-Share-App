import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "secondary" | "third";
  size?: "large" | "secondarySmall";
  isLink?: boolean;
  href?: string;
}

const Button = ({
  buttonType,
  size,
  className,
  isLink,
  href = "/",
  children,
  ...props
}: ButtonTypes) => {
  if (isLink)
    return (
      <Link
        className={cn(buttonVariants({ buttonType, size }), className)}
        href={href}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={cn(buttonVariants({ buttonType, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

const buttonVariants = cva(
  "rounded-lg text-center py-3 px-7 text-base font-semibold disabled:opacity-25",
  {
    variants: {
      buttonType: {
        primary: "bg-purple text-white hover:bg-purpleHover active:bg-purple",
        secondary: "border border-purple text-purple hover:bg-purpleLight",
        third: "text-grey",
      },
      size: {
        large: "w-full",
        secondarySmall: "px-4 py-3",
      },
    },
  }
);

export default Button;
