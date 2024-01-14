import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { HeaderMenu } from "@/components/item/HeaderMenu";

import { ShellMenu } from "@/components/item/ShellMenu";
import { db } from "@/lib/db";
import { Suspense } from "react";
import OverviewSkeleton from "@/components/item/admin/Overview/OverviewSkeleton";
import Overview from "@/components/item/admin/Overview/Overview";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  return (
    <ShellMenu className="pt-10">
      <HeaderMenu heading="Menu Admin" text="Informasi Data"></HeaderMenu>
      <div className="p-6">
        <Suspense fallback={<OverviewSkeleton />}>
          <Overview />
        </Suspense>
      </div>
    </ShellMenu>
  );
}
