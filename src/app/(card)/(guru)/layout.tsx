import "@/styles/card.css";

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  NavbarProvider,
  NavbarMobile,
} from "@/components/item/materi/navbar-mobile";
import { NavbarCard } from "@/components/item/materi/navbar-card";
import { NavbarCardGuru } from "@/components/item/teacher/NavbarCard";

export const metadata = {
  title: "Forum Madrasah",
  description: "testing",
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
    <div className="bg-slate-300">
      <div className="all smooth" suppressHydrationWarning>
        {" "}
        <main>
          <NavbarProvider>
            <NavbarCardGuru />
            <NavbarMobile />
          </NavbarProvider>
          {children}
        </main>
      </div>
    </div>
  );
}
