"use client";
import { FC, useEffect } from "react";
import dynamic from "next/dynamic";

import useNotStarted from "./progress/useNotStartedModal";
import useCurrentlyLearning from "./progress/useCurrentlyLearning";
import useFinishedLearning from "./progress/useFinishedLearning";
import { DragCourseType } from "@/types/item-type";
import { DragContainerSkeleton } from "./ProgressLoading";

interface DragContainerProps {
  notStartedCourses: DragCourseType[];
  currentlyLearningCourses: DragCourseType[];
  finishedLearningCourses: DragCourseType[];
}

const NotStartedContainer = dynamic(
  () => import("@/components/item/progress/NotStartedContainer"),
  {
    ssr: false,
    loading: () => <DragContainerSkeleton title="Planning" />,
  }
);

const CurrentlyLearningContainer = dynamic(
  () => import("@/components/item/progress/CurrentlyLearningContainer"),
  {
    ssr: false,
    loading: () => <DragContainerSkeleton title="Watching" />,
  }
);

const FinishedLearningContainer = dynamic(
  () => import("@/components/item/progress/FinishedLearningContainer"),
  {
    ssr: false,
    loading: () => <DragContainerSkeleton title="Completed" />,
  }
);

const DragContainer: FC<DragContainerProps> = ({
  currentlyLearningCourses,
  finishedLearningCourses,
  notStartedCourses,
}) => {
  const { setBoard: setNotStarted } = useNotStarted();
  const { setBoard: setCurrentlyLearning } = useCurrentlyLearning();
  const { setBoard: setFinishedLearning } = useFinishedLearning();

  useEffect(() => {
    setNotStarted(notStartedCourses);
    setCurrentlyLearning(currentlyLearningCourses);
    setFinishedLearning(finishedLearningCourses);
  }, [
    notStartedCourses,
    currentlyLearningCourses,
    finishedLearningCourses,
    setNotStarted,
    setCurrentlyLearning,
    setFinishedLearning,
  ]);

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <NotStartedContainer />
      <CurrentlyLearningContainer />
      <FinishedLearningContainer />
    </div>
  );
};

export default DragContainer;
