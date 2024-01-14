import { Metadata } from "next";

import { Shell } from "@/components/item/Shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShowBack } from "@/components/item/Header";
import CreateEventClient from "@/components/item/admin/Events/CreateEventClient";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Buat event",
};

const CreatePollPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/guest");
  }

  const adminId = session.user.id;

  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href={`/admin/${adminId}/events/create`} />
          <CardTitle>Buat Event Sekolah</CardTitle>
          <CardDescription className="line-clamp-2">
            Isi Semua Form Di bawah ini dengan benar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateEventClient />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default CreatePollPage;
