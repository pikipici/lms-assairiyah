import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { TeacherClient } from "@/components/item/admin/teacherlist/client";
import { TeacherColumn } from "@/components/item/admin/teacherlist/columns";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const PostsPage = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/guest");
  }

  const users = await db.user.findMany({
    where: {
      role: "TEACHER",
    },
    orderBy: {
      name: "asc",
    },
  });

  const adminId = session.user.id;

  const formattedTeachers: TeacherColumn[] = users.map((item) => ({
    id: item.id,
    nip: item.nip,
    nuptk: item.nuptk,
    name: item.name,
    email: item.email,
    username: item.username,
    image: item.image,
    role: item.role,
    password: item.password,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <TeacherClient data={formattedTeachers} adminId={adminId} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default PostsPage;
