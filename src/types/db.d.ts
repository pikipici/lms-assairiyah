import {
  Comment,
  Post,
  Subreddit,
  User,
  Vote,
  Poll,
  PollOption,
  PollVote,
} from "@prisma/client";

export type ExtendedPost = Post & {
  subreddit: Subreddit;
  votes: Vote[];
  author: User;
  comments: Comment[];
  savedby: User[];
};

export type ExtendedCommunity = Subreddit & {
  Creator: User;
  posts: Post[];
};

export type ExtendedPoll = Poll & {
  creator: User;
  option: Array<PollOption & { vote: PollVote[] }>;
};
