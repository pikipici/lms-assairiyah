import "@/styles/card.css";

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  NavbarProvider,
  NavbarMobile,
} from "@/components/item/materi/navbar-mobile";
import { NavbarCard } from "@/components/item/materi/navbar-card";
// import { Footer } from "@/components/atoms/footer";
import Link from "next/link";
import { Footer } from "@/components/item/materi/footer";
import { BiGitBranch, BiRefresh, BiXCircle } from "react-icons/bi";
import { IoWarningOutline, IoLogoGithub } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata = {
  title: "Forum Madrasah",
  description: "testing",
};

export default async function CourseLayout({
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
            <NavbarCard />
            <NavbarMobile />
          </NavbarProvider>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
