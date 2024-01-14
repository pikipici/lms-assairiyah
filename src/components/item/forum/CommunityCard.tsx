import { FC } from "react";
import Link from "next/link";

import { ExtendedCommunity } from "@/types/db";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "../UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { cn, formatDescription, formatUrl } from "@/lib/utils";
import AvatarForum from "./AvatarForum";
import { Badge } from "@/components/ui/badge";

interface CommunityCardProps {
  community: ExtendedCommunity;
}

const CommunityCard: FC<CommunityCardProps> = ({ community }) => {
  const formattedHref = `/f/${formatUrl(community.name)}`;
  return (
    <Link href={formattedHref} className="focus:outline-none group">
      <Card className="flex h-full flex-col dark:hover:border-neutral-900 hover:border-neutral-100 transition focused">
        <CardHeader className="flex-1 py-5">
          <CardTitle className="line-clamp-1">
            <div className="flex gap-2.5">
              <AvatarForum className="h-8 w-8" user={community} />
              <div className="space-y-2.5">
                <div className="flex flex-col md:flex-row md:items-center gap-x-2.5">
                  {community.name}
                  <div className="space-x-1 justify-between">
                    <span className="text-sm text-muted-foreground">
                      Dibuat oleh {community.Creator.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <Badge>{`#${community.category!.toLowerCase()}`}</Badge>
                    </span>
                  </div>
                </div>
                <CardDescription className="font-normal">
                  {community.description}
                </CardDescription>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CommunityCard;
