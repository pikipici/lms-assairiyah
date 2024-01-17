"use client";

import { formatTimeToNow, indoFormatTime } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./PostVoteClient";
import PostDropdown from "./PostDropDown";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import axios from "axios";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
    savedby: User[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const PostCard: FC<PostProps> = ({
  votesAmt: votesAmt,
  subredditName,
  post,
  commentAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {});

  // const handleSave = (postId: string) => {
  //   if (!isSaved) {
  //     axios.put("/api/post/save", { postId, userId: user?.id });
  //     setSaves((prev) => [user, ...prev]);
  //   }
  //   if (isSaved) {
  //     axios.put("/api/post/unsave", { postId, userId: user?.id });
  //     const newSaves = saves.filter((like: any) => like?.id !== user?.id);
  //     setSaves(newSaves);
  //   }
  // };

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        {/* TODO: PostVotes */}
        <PostVoteClient
          postId={post.id}
          initialVote={currentVote?.type}
          initialVotesAmt={votesAmt}
        />

        <div className="w-0 flex-1">
          <div className="flex justify-between">
            <div className="max-h mt-1 text-xs text-gray-500">
              {subredditName ? (
                <>
                  <a
                    className="underline text-zinc-900 text-sm underline-offset-2"
                    href={`/f/${subredditName}}`}
                  >
                    Forum {subredditName}
                  </a>
                  <span className="px-1">•</span>
                </>
              ) : null}
              <span>Di posting oleh {post.author.username}</span>{" "}
              {formatTimeToNow(new Date(post.createdAt))}
            </div>
            <PostDropdown post={post}>
              <Button variant="ghost" size="icon">
                <Icons.ellipsis className="h-4 w-4" />
              </Button>
            </PostDropdown>
          </div>

          <a href={`/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />

            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex bg-gray-50 z-20 text-sm p-4 sm:px-6 space-x-4 justify-between">
        <a className="w-fit flex items-center gap-2" href={`/post/${post.id}`}>
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </a>
        <p className="w-fit flex items-center gap-2">
          {indoFormatTime(post.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
