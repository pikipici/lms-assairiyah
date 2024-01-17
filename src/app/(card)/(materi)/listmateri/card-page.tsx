import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@chakra-ui/react";
import {
  FadeInStagger,
  FadeIn,
  AnimatePresence,
} from "@/components/ui/fade-in";
import { db } from "@/lib/db";
import Balancer from "react-wrap-balancer";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import { getCourses } from "@/app/actions/get-courses";
import { getAuthSession } from "@/lib/auth";
import { formatUrl } from "@/lib/utils";
import { redirect } from "next/navigation";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

interface SearchPageProps {
  name: string;
  title: string;
  description: string | null;
  mapel: string;
  tingkat: string;
  progress: number | null;
}

export const metadata = {
  title: "Materi Pembelajaran",
};

export const CardPage = ({
  name,
  title,
  description,
  mapel,
  tingkat,
  progress,
}: SearchPageProps) => {
  const buttonmenu =
    progress === null ? (
      <Button colorScheme="red">Red</Button>
    ) : progress === 100 ? (
      <Button colorScheme="messager">mess</Button>
    ) : (
      <Button colorScheme="yellow">yellow</Button>
    );

  return (
    <>
      <FadeIn
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-max hover:shadow-lg hover:shadow-secondary">
          <CardHeader className="p-5">
            <CardTitle>
              <Link
                href={`/listmateri/${formatUrl(name)}`}
                className="leading-normal"
              >
                {title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-5 text-lg text-muted-foreground line-clamp-4">
            <p className="text-justify">{description}</p>
          </CardContent>
          <CardFooter className="p-5 justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-x-1">
                <p className="text-sm text-muted-foreground">
                  Untuk Tingkat :{tingkat}
                </p>
                {/* <Badge variant={"default"}>{course.tingkat?.name}</Badge> */}
              </div>
              {/* <p className="text-sm font-bold text-muted-foreground hidden md:block">
                    {moment(course.createdAt).format("LL")}
                  </p> */}
              <div className="flex items-center gap-x-1">
                <p className="text-sm text-muted-foreground">
                  Mata Pelajaran:{" "}
                </p>
                <Badge variant={"default"}>{mapel}</Badge>
              </div>
            </div>

            {progress === null ? (
              <Button colorScheme="red">Red</Button>
            ) : (
              <CircularProgress value={progress} color="green.400">
                <CircularProgressLabel>{progress}</CircularProgressLabel>
              </CircularProgress>
            )}
          </CardFooter>
        </Card>
      </FadeIn>
    </>
  );
};
