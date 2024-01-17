import Link from "next/link";
import dynamic from "next/dynamic";

import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
// import UserAccountDropdown from "@/components/User/UserAccountDropdown";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { navItemType } from "@/types/item-type";
import UserAccountNav from "@/components/navigation/UserAccountNav";
import { db } from "@/lib/db";
import Image from "next/image";

const MobileNav = dynamic(() => import("@/components/navigation/MobileNav"));

const Navbar = async () => {
  const session = await getAuthSession();
  const getUser = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const navItems: navItemType[] = [
    {
      id: 1,
      label: "Browse",
      href: "/browse",
    },
    {
      id: 2,
      label: "Community",
      href: "/community",
    },
    {
      id: 3,
      label: "Watchlist",
      href: "/watchlist",
    },
    {
      id: 4,
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      id: 5,
      label: "Poll",
      href: "/poll",
    },
  ];

  return (
    <div className="sticky top-0 z-40 w-full bg-background flex justify-between lg:space-around items-center py-3 border-b px-8 lg:px-16">
      <MobileNav
        mainNavItems={navItems}
        session={session}
        initialData={getUser}
      />
      <div className="w-full lg:flex hidden gap-x-8 items-center">
        <div className="relative z-20 flex items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Image height={50} width={50} alt="icon" src="/trace.svg" />
            <p className="hidden text-zinc-700 text-sm font-medium md:block">
              E-learning Madrasah
            </p>
          </Link>
          {/* <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-md tracking-tighter"
            )}
          >
            <Icons.logo className="mr-2 h-6 w-6  fill-black dark:fill-white" />
            Otaku Sphere
          </Link> */}
        </div>
        <div className="flex items-center gap-x-4">
          {/* {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-sm font-medium"
              )}
            >
              {item.label}
            </Link>
          ))} */}
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        {session?.user ? (
          <UserAccountNav user={session.user} initialData={getUser} />
        ) : null}

        {/* {session ? (
          <UserAccountDropdown session={session} />
        ) : (
          <Link href="/sign-in" className=" tracking-tighter">
            <Button className="mx-2 w-full" size="sm">
              Sign In
              <div className="sr-only">Sign In</div>
            </Button>
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
