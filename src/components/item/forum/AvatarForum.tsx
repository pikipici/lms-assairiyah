import { User } from "next-auth";
import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Subreddit } from "@prisma/client";

interface UserAvatarProps extends AvatarProps {
  user: Pick<Subreddit, "name" | "imageUrl">;
}

const AvatarForum: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.imageUrl ? (
        <div>
          <Image
            fill
            src={user.imageUrl}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarForum;
