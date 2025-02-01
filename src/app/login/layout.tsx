import type { Metadata } from "next";
import { instrumentSans } from "../fonts/fonts";
import "../globals.css";
// import { MobilePreviewSection, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Link Share",
  description: "The Login page for the link sharing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable}`}>
      <body
        className={`font-instrumentSans bg-lightGrey min-h-[100svh] smallTablet:grid smallTablet:place-items-center`}
      >
        {children}
      </body>
    </html>
  );
}
