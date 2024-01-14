import { db } from "@/lib/db";
import { OverviewType } from "@/types/item-type";
import OverviewClient from "./OverviewClient";

const Overview = async () => {
  const promises = [
    db.post.count(),
    db.subreddit.count(),
    db.user.count(),
    db.kelas.count(),
    db.mapel.count(),
    db.course.count(),
  ];

  const [
    postCount,
    subredditCount,
    userCount,
    kelasCount,
    mapelCount,
    courseCount,
  ] = await Promise.all(promises);

  const data: OverviewType[] = [
    {
      title: "Total Postingan",
      category: "Post",
      count: postCount,
    },
    {
      title: "Total Forum",
      category: "Forum",
      count: subredditCount,
    },
    {
      title: "Total User",
      category: "User",
      count: userCount,
    },
    {
      title: "Total Kelas",
      category: "Kelas",
      count: kelasCount,
    },
    {
      title: "Total Mata Pelajaran",
      category: "Mapel",
      count: mapelCount,
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
