import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/signin");
  }

  const getUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return (
    <>
      <div className="pt-10">
        <h1 className="font-bold text-3xl md:text-4xl">Beranda</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          {/* feed
  
            <Suspense fallback={<PostSkeleton />}>
              @ts-expect-error server component
              <CustomFeed />
            </Suspense>
  
            <BoxInfo getUser={getUser} session={session} /> */}
        </div>
      </div>
    </>
  );
}
