import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { ShellMenu } from "@/components/item/ShellMenu";
import { db } from "@/lib/db";
import { format } from "date-fns";
import id from "date-fns/locale/id";

export const metadata = {
  title: "Dashboard",
};

export default async function TeacherPage({
  params,
}: {
  params: { teachersId: string };
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  return (
    <ShellMenu>
      <div>
        <p>p</p>
      </div>
    </ShellMenu>
  );
}
