import Link from "next/link";
import { Heading, BaseText } from "@/components/reusable/text";
import { AltLogoLarge } from "@/components/icons";

const NotFound = () => {
  return (
    <main className="w-full min-h-[100svh] grid place-items-center bg-purple">
      <div className="p-10 text-center text-white flex flex-col justify-center items-center gap-2">
        <AltLogoLarge/>
        <Heading className="text-white" size="medium">
          404
        </Heading>
        <Heading className="text-white" size="medium">
          Page Not Found
        </Heading>
        <BaseText className="text-lightGrey" size="medium">
          This page appears the be missing
        </BaseText>
        <div className="mt-6">
          <Link
            href="/"
            className="w-full h-full px-4 py-2 rounded-lg text-black border border-white bg-white hover:cursor-pointer hover:bg-opacity-0 hover:text-white active:text-black active:bg-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
