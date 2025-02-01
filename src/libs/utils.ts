import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { ClassValue } from "clsx";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export {
  cn
}