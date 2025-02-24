// import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import type { Metadata } from "next";
import { AppProvider } from "@/context/Context";
import { instrumentSans } from "../fonts/fonts";
import "../globals.css";
import { MobilePreviewSection, Navbar } from "@/components";
import Providers from "@/query/Providers";
import HydrateComps from "@/components/HydrateComps";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`font-instrumentSans bg-lightGrey`}>
        <Providers>
          <AppProvider>
            <HydrateComps>
              <div className="w-full flex flex-col min-h-[100svh] max-w-maxBodyWidth mx-auto">
                <Navbar />
                <main className="w-full flex flex-row-reverse gap-6 flex-grow-[1] p-4 lgMob:p-6">
                  {children}
                  <MobilePreviewSection />
                </main>
              </div>
              <Toaster/>
            </HydrateComps>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
