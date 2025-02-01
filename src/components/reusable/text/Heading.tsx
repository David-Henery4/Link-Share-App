import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { HTMLAttributes } from "react";

interface HeadingTypes extends HTMLAttributes<HTMLHeadingElement> {
  size: "medium" | "small";
}

const Heading = ({ size, className, ...props }: HeadingTypes) => {
  return <h1 className={cn(headingVariants({ size }), className)} {...props} />;
};

// MIGHT NOT EVEN NEED!!!!!!!!!!
const headingVariants = cva("font-bold text-darkGrey", {
  variants: {
    size: {
      medium: "text-[32px]",
      small: "text-2xl",
    },
  },
});

export default Heading;
