import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import Navbar from "@/components/item/admin/Navbar";

export const metadata = {
  title: "Menu Admin",
};

export default async function RootLayout({
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
        <div className="max-w-7xl mx-auto h-full">{children}</div>
      </div>
    </div>
  );
}
