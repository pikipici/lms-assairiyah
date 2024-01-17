import UserAccountNav from "@/components/navigation/UserAccountNav";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const NavbarRoutes = async () => {
  const session = await getAuthSession();

  const getUser = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return (
    <div className="flex gap-x-2 ml-auto">
      {/* {session?.user ? (
        <UserAccountNav user={session.user} initialData={getUser} />
      ) : null} */}
    </div>
  );
};

export default NavbarRoutes;
