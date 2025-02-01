import { PreviewNavbar, PreviewCard } from "@/components/preview-page";
import { cookies } from "next/headers";
import { decrypt } from "@/libs/session";
import {Toaster} from "@/components/ui/toaster"

const PreviewPage = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const isUser = session?.userId ?? null
  //
  return (
    <main className="w-full min-h-[100svh] max-w-maxBodyWidth mx-auto">
      {isUser && <PreviewNavbar />}

      <div className="hidden smMob:block absolute top-0 left-0 w-full h-[357px] rounded-b-[32px] bg-purple -z-10"></div>

      <section className="w-full my-16 grid place-items-center">
        <PreviewCard />
      </section>

      <Toaster/>
    </main>
  );
};

export default PreviewPage;
