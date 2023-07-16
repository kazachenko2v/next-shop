import { User } from "@prisma/client";

import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Image from "next/image";

interface UserAvatarProps {
  user: Pick<User, "image" | "name">;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {

  return (
    <Avatar className={className ? className : "h-8 w-8"}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
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
}
