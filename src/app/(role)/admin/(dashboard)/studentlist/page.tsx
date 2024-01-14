import { db } from "@/lib/db";
import { ShellMenu } from "@/components/item/ShellMenu";
import { StudentClient } from "@/components/item/student/client";
import { StudentColumn } from "@/components/item/student/columns";
import { format } from "date-fns";
import id from "date-fns/locale/id";

const PostsPage = async () => {
  const users = await db.user.findMany({
    where: {
      role: "STUDENT",
    },
    include: {
      kelas: true,
    },
  });

  const formattedStudents: StudentColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    username: item.username,
    image: item.image,
    role: item.role,
    kelas: item.kelas?.name,
  }));

  return (
    <ShellMenu className="pt-10">
      <div>
        <div className="flex-col">
          <div className="flex-1 space-y-4 pl-2">
            <StudentClient data={formattedStudents} />
          </div>
        </div>
      </div>
    </ShellMenu>
  );
};

export default PostsPage;
