import Link from "next/link";

// import { NavLink } from "@/components/atoms/nav-link";
// import Searchbar from "./SearchBar";
// import SearchBarMateri from "./SearchBarMateri";

import { NavbarMobileBtn } from "../materi/navbar-mobile";
import { getAuthSession } from "@/lib/auth";
import AvatarMateri from "../materi/AvatarMateri";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const NavbarCardGuru = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/guest");
  }
  const getUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  return (
    <nav className="md:grid grid-cols-12 border-b flex items-center justify-between relative z-10 bg-background overflow-x-auto">
      <Link
        href="/"
        className="md:border-r md:px-5 px-2.5 py-4 text-foreground md:col-span-3 lg:col-span-2 shrink-0 transition-colors"
      >
        Daftar Guru
      </Link>
      <div className="md:col-span-9 lg:col-span-10 flex items-center justify-between">
        {/* <ul className="md:flex items-center divide-x w-max border-r hidden shrink-0"> */}
        <div className="ml-5">{/* <SearchBarMateri /> */}</div>
        <div className="mr-5">
          <AvatarMateri user={session.user} initialData={getUser} />
        </div>
        {/* {navMenu.map((menu, i) => (
            <NavLink key={i} href={menu.path}>
              {menu.name}
            </NavLink>
          ))} */}
        {/* </ul> */}
        <NavbarMobileBtn />
      </div>
    </nav>
  );
};

export const navMenu = [
  {
    name: "_hello",
    path: "/",
  },
  // {
  //   name: "_about-me",
  //   path: "/about",
  // },
  // {
  //   name: "_projects",
  //   path: "/projects",
  // },
  // {
  //   name: "_guest-book",
  //   path: "/guest-book",
  // },
  // {
  //   name: "_articles",
  //   path: "/articles",
  // },
];
