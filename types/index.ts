import { User, Comment } from "@prisma/client";
import { UseMutateFunction } from "@tanstack/react-query/build/lib/types";
import { Dispatch, SetStateAction } from "react";

export type ExtendedComment = Comment & {
  author: User;
};

export interface UserCommentsProps {
  comment: ExtendedComment;
  gameId: string;
  userId: string;
}

export interface CommentFormProps {
  initText: string;
  mutate: UseMutateFunction<any, Error, any, unknown>;
  isPending: boolean;
  options: Object;
  setIsUpdating?: Dispatch<SetStateAction<boolean>>;
}
