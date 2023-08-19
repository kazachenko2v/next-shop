import { formatTimeToNow } from "@/lib/utils2";
import { UserAvatar } from "../UserAvatar";
import { ExtendedComment } from "@/types";

const Comment = async ({ comment }: { comment: ExtendedComment }) => {
  return (
    <>
      <div className="flex gap-4">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-14 w-14"
        />
        <div>
          <h3 className="truncate whitespace-nowrap text-xl">
            {comment.author.name}
          </h3>
          <p className="text-sm text-gray-400">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <div>
        <p>{comment.text}</p>
      </div>
    </>
  );
};

export default Comment;
