export const dynamicParams = false;
import { PreviewNavbar, PreviewCard } from "@/components/preview-page";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/db";
import { createClient } from "@/utils/server";
import { profileDetailsTable } from "@/db/schemas";

export async function generateStaticParams() {
  const profileList = await db.select().from(profileDetailsTable);
  //
  return profileList.map((post) => ({
    slug: post.userId,
  }));
}

const PreviewPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug: userIdParam } = await params;
  //
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isUser = user?.id ?? null;
  //
  return (
    <main className="w-full min-h-[100svh] max-w-maxBodyWidth mx-auto">
      {isUser && isUser === userIdParam && <PreviewNavbar />}

      <div className="hidden smMob:block absolute top-0 left-0 w-full h-[357px] rounded-b-[32px] bg-purple -z-10"></div>

      <section className="w-full my-16 grid place-items-center">
        <PreviewCard userIdParam={userIdParam} />
      </section>

      <Toaster />
    </main>
  );
};

export default PreviewPage;
