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
import CreatePollClient from "@/components/item/polling/CreatePollClient";

export const metadata: Metadata = {
  title: "Buat Polling",
  description:
    "Halaman untuk membuat polling. Isilah form yang telah disediakan dibawah dengan benar untuk membuat polling.",
};

const CreatePollPage = () => {
  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href="/poll" />
          <CardTitle>Laman Buat Polling</CardTitle>
          <CardDescription className="line-clamp-2">
            Isilah form yang telah disediakan dibawah dengan benar untuk membuat
            polling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePollClient />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default CreatePollPage;
