"use client";

import axios from "axios";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  courseId: string;
  userId: string;
  videoUrl: any;
  chapterId: string;
  nextChapterId?: string;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  userId,
  courseId,
  chapterId,
  videoUrl,
  nextChapterId,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/update/course/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress diupdated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/materi/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Ada yang salah, coba lagi nanti");
    }
  };

  return (
    <div>
      <div className="relative aspect-video">
        {hasWindow && (
          <ReactPlayer
            className="items-center justify-center"
            controls={true}
            url={videoUrl}
            onEnded={onEnd}
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};
