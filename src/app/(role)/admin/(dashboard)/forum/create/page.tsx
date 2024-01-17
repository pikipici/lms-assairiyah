import { Metadata } from "next";

import { Shell } from "@/components/item/Shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateCommunityClient from "@/components/item/forum/CreateCommunityClient";
import { ShowBack } from "@/components/item/Header";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Buat Forum",
  description:
    "Halaman untuk membuat forum baru, silahkan isi form sesuai dengan kebutuhan anda untuk membuat forum baru",
};

const page = async () => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/signin");
  }
  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href={`/admin/${session.user.id}/forum`} />
          <CardTitle>Halaman Membuat Forum</CardTitle>
          <CardDescription className="line-clamp-2">
            Mohon Isi Form Sesuai Dengan Kebutuhan Anda Untuk Membuat Forum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCommunityClient />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
