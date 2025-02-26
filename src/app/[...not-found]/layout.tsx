import type { Metadata } from "next";
import { instrumentSans } from "../fonts/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dev Links | 404 | Page can't be found",
  description: "Page can't be found",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable}`}>
      <body className={`font-instrumentSans bg-purple`}>{children}</body>
    </html>
  );
}
