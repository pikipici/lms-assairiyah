"use client";

import dynamic from "next/dynamic";
import { Post } from "@prisma/client";
import { ExtendedPost } from "@/types/db";
import { Skeleton } from "@/components/ui/skeleton";
import PostSkeleton from "./PostSkeleton";

const BrowsePost = dynamic(() => import("./PostFeed"), {
  ssr: false,
  loading: () => <BrowsePostSkeleton />,
});

const PostClient = ({ initialPosts }: { initialPosts: ExtendedPost[] }) => {
  return <BrowsePost initialPosts={initialPosts} />;
};

export default PostClient;

const BrowsePostSkeleton = () => {
  return (
    <>
      <PostSkeleton />
    </>
  );
};
