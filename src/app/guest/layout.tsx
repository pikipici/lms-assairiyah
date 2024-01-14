import { cn } from "@/lib/utils";
import Navbar from "@/components/item/guest/Navbar";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("bg-white text-slate-900 antialiased light")}>
      <div className="min-h-screen bg-slate-50 antialiased">
        <Navbar />
        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
      </div>
    </div>
  );
}
