import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Forum Madrasah",
  //   description: "testing",
};

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <div className={cn("min-h-screen bg-background")}>{children}</div>
    </div>
  );
}
