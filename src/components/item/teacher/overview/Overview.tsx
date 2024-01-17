import { db } from "@/lib/db";
import { OverviewType } from "@/types/item-type";
import OverviewClient from "./OverviewClient";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Overview = async () => {
  const session = await getAuthSession();
  if (!session) return redirect("/guest");

  const posts = await db.post.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  const post = posts.length;

  const forum = await db.subreddit.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  const forumCount = forum.length;

  const mymateri = await db.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  const mymateriCount = mymateri.length;

  const promises = [post, forumCount, db.kelas.count(), mymateriCount];

  const [postCount, subredditCount, kelasCount, courseCount] =
    await Promise.all(promises);

  const data: OverviewType[] = [
    {
      title: "Total Postingan Anda",
      category: "Post",
      count: postCount,
    },
    {
      title: "Total Forum Anda",
      category: "Forum",
      count: subredditCount,
    },
    {
      title: "Total Kelas",
      category: "Kelas",
      count: kelasCount,
    },
    {
      title: "Total Materi Pembelajaran",
      category: "Mapem",
      count: courseCount,
    },
  ];

  return <OverviewClient data={data} />;
};

export default Overview;
