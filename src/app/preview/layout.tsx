import type { Metadata } from "next";
import { instrumentSans } from "../fonts/fonts";
import "../globals.css";
// import { MobilePreviewSection, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Link Share",
  description: "The app for all your link sharing needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable}`}>
      <body className={`font-instrumentSans bg-lightGrey`}>{children}</body>
    </html>
  );
}
