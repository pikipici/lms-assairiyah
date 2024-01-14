"use client";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ExtendedPoll } from "@/types/db";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "../UserAvatar";
import { cn, convertToSingleDecimalPlace, formatTimeLeft } from "@/lib/utils";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { VotePollValidatorType } from "@/lib/validators/poll";
import PollDropdown from "./PollDropdown";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Custom-UI/Icon";

interface PollCardProps {
  poll: ExtendedPoll;
  interaction?: boolean;
  sessionId: string;
}

const PollCard: FC<PollCardProps> = ({ poll, sessionId, interaction }) => {
  const pollInfiniteQueryKey = interaction
    ? ["polls-infinite-query"]
    : ["polls-infinite-query-results"];

  const queryClient = useQueryClient();
  const { endErrorToast, loginToast } = useCustomToast();

  const [hasVoted, setHasVoted] = useState(
    !!interaction &&
      poll.option.some((option) =>
        option.vote.some((vote) => vote.userId === sessionId)
      )
  );

  const votedOption = poll.option.find((option) =>
    option.vote.some((vote) => vote.userId === sessionId)
  );

  const votedIndex = poll.option.findIndex((option) =>
    option.vote.some((vote) => vote.userId === sessionId)
  );

  const formattedName = poll.creator.name?.split(" ")[0].toLowerCase();
  const totalVotes = poll.option.reduce(
    (sum, option) => sum + option.vote.length,
    0
  );

  const { mutate: votePoll, isLoading: voteLoading } = useMutation({
    mutationFn: async ({ optionId }: VotePollValidatorType) => {
      const payload: VotePollValidatorType = {
        optionId,
      };

      const { data } = await axios.post("/api/polling/vote", payload);
      return data;
    },
    onError: (error) => {
      setHasVoted(false);

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Poll does not exist.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "You have already voted.",
            description: "You can undo your vote and vote again.",
            variant: "destructive",
          });
        }
        if (statusCode === 410) {
          return toast({
            title: "Poll has expired",
            description: "Look for another poll.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are casting your vote.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your vote was cast.",
      });

      setHasVoted(true);

      queryClient.resetQueries(pollInfiniteQueryKey);
    },
  });

  const { mutate: undoVotePoll, isLoading: unvoteLoading } = useMutation({
    mutationFn: async ({ optionId }: VotePollValidatorType) => {
      const payload: VotePollValidatorType = {
        optionId,
      };

      const { data } = await axios.post("/api/polling/vote/undo", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Poll does not exist.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "Your vote does not exist.",
            description: "You can vote again.",
            variant: "destructive",
          });
        }
        if (statusCode === 410) {
          return toast({
            title: "Poll has expired",
            description: "Look for another poll.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are removing your vote.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your vote was removed",
      });
      setHasVoted(false);

      queryClient.resetQueries(pollInfiniteQueryKey);
    },
  });

  const handleVotePollOption = (optionId: string) => {
    if (!interaction || hasVoted) return;

    if (voteLoading) {
      return toast({
        title: "Please wait",
        description: "We are casting your vote.",
      });
    }

    votePoll({ optionId });
  };

  const handleUndoVotePoll = () => {
    if (!interaction || !hasVoted || !votedOption) return;

    if (unvoteLoading) {
      return toast({
        title: "Please wait",
        description: "We are removing your vote.",
      });
    }

    undoVotePoll({ optionId: votedOption.id });
  };

  return (
    <Card>
      <CardHeader className="space-y-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{`${poll.creator.name}: ${poll.question}`}</CardTitle>

          <PollDropdown
            poll={poll}
            sessionId={sessionId}
            pollInfiniteQueryKey={pollInfiniteQueryKey}
          >
            <Button variant="ghost" size="icon">
              <Icons.ellipsis className="h-4 w-4" />
            </Button>
          </PollDropdown>
        </div>
        <div className="space-y-2">
          {poll.option.map((opt) => {
            const votePercentage =
              totalVotes === 0 ? 0 : (opt.vote.length / totalVotes) * 100;

            return (
              <Card
                key={opt.id}
                className={cn("relative transition", {
                  "cursor-pointer dark:hover:border-neutral-900 hover:border-neutral-100":
                    interaction && !hasVoted,
                })}
                onClick={() => handleVotePollOption(opt.id)}
              >
                <div
                  className={cn(
                    "absolute h-full z-0 bg-primary-foreground rounded-md"
                  )}
                  style={{
                    width: `${!interaction || hasVoted ? votePercentage : 0}%`,
                  }}
                />
                <CardHeader className="p-3">
                  <div className="flex justify-between z-10">
                    <CardDescription>{opt.option}</CardDescription>
                    <CardDescription>
                      {(!interaction || hasVoted) &&
                        `${convertToSingleDecimalPlace(votePercentage, 1)}%`}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground py-3 flex flex-wrap gap-1">
        <span>Dibuat oleh {`u/${formattedName}`}</span>
        <UserAvatar user={poll.creator} className="h-3 w-3" />·
        <span>Jumlah vote {totalVotes.toLocaleString()}·</span>
        <span>
          {!interaction && "Expired "}
          {formatTimeLeft(new Date(poll.expiresAt))}{" "}
          {interaction ? "left" : "ago"}
        </span>
        {hasVoted && votedOption && (
          <div className="space-x-1">
            <span>·</span>
            <span>{`You selected option ${votedIndex + 1}`}</span>
            <span>·</span>
            <span
              className="underline underline-offset-4 text-sky-600 cursor-pointer"
              onClick={handleUndoVotePoll}
            >
              Undo
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PollCard;
