import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import CommunitySidebar from "@/components/item/forum/CommunitySidebar";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forum Diskusi",
  description: "Forum Diskusi",
};

export default async function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r lg:sticky lg:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <CommunitySidebar />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
