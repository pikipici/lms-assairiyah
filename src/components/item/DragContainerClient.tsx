"use client";
import { DragContainerSkeleton } from "./ProgressLoading";
import { DragCourseType } from "@/types/item-type";
import dynamic from "next/dynamic";

const DragContainer = dynamic(() => import("@/components/item/DragContainer"), {
  ssr: false,
  loading: () => <WatchlistSkeleton />,
});

interface DragContainerProps {
  notStartedCourses: DragCourseType[];
  currentlyLearningCourses: DragCourseType[];
  finishedLearningCourses: DragCourseType[];
}

const DragContainerClient = ({
  currentlyLearningCourses,
  finishedLearningCourses,
  notStartedCourses,
}: DragContainerProps) => {
  return (
    <DragContainer
      notStartedCourses={notStartedCourses}
      currentlyLearningCourses={currentlyLearningCourses}
      finishedLearningCourses={finishedLearningCourses}
    />
  );
};

export default DragContainerClient;

const WatchlistContainers = [
  {
    id: 1,
    title: "Rencana belajar",
  },
  {
    id: 2,
    title: "Sedang dipelajari",
  },
  {
    id: 3,
    title: "Selesai dipelajari",
  },
];

const WatchlistSkeleton = () => {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {WatchlistContainers.map((item) => (
        <DragContainerSkeleton key={item.id} title={item.title} />
      ))}
    </div>
  );
};
