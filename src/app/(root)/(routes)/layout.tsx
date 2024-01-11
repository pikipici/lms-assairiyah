import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
// import Navbar from "@/components/Navbar";
import Navbar from "@/components/navigation/Navbar";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Beranda",
};

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  return (
    <div className={cn("bg-white text-slate-900 antialiased light")}>
      <div className="min-h-screen bg-slate-50 antialiased">
        <Navbar />
        <div className="container max-w-7xl mx-auto h-full">{children}</div>
      </div>
    </div>
  );
}
