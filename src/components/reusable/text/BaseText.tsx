import { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";

interface BaseTextTypes extends HTMLAttributes<HTMLParagraphElement> {
  size: "small" | "medium";
}

const BaseText = ({ size, className, ...props }: BaseTextTypes) => {
  return <p className={cn(baseTextVariants({ size }), className)} {...props} />;
};

const baseTextVariants = cva("font-normal text-grey", {
  variants: {
    size: {
      medium: "text-base",
      small: "text-xs",
    },
  },
});

export default BaseText;
