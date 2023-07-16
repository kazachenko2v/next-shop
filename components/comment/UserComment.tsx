"use client";

import Comment from "@/components/comment/Comment";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  RemoveCommentPayload,
  UpdateCommentPayload,
} from "@/lib/validators/comment";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import CreateComment from "./CreateComment";
import { UserCommentsProps } from "@/types";
import { Button } from "../ui/Button";
import { FC, useState } from "react";
import CommentForm from "./CommentForm";

const UserComment: FC<UserCommentsProps> = ({ comment, gameId, userId }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const { mutate: remove, isPending: removePending } = useMutation({
    mutationFn: async ({ gameId, userId }: RemoveCommentPayload) => {
      const payload: RemoveCommentPayload = { gameId, userId };

      const { data } = await axios.patch(`/api/comment/delete`, payload);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Comment wasn't created successfully. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationFn: async ({ gameId, userId, text }: UpdateCommentPayload) => {
      const payload: UpdateCommentPayload = { gameId, userId, text };

      const { data } = await axios.patch(`/api/comment/update`, payload);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Comment wasn't created successfully. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setIsUpdating((prev) => !prev);
      router.refresh();
    },
  });

  return (
    <>
      {isUpdating ? (
        <CommentForm
          initText={comment.text}
          mutate={update}
          isPending={updatePending}
          options={{ gameId, userId }}
          setIsUpdating={setIsUpdating}
        />
      ) : (
        <>
          <Comment comment={comment} />
          <div className="space-x-2 justify-self-end">
            <Button onClick={() => setIsUpdating((prev) => !prev)}>
              Update
            </Button>
            <Button
              variant="destructive"
              isLoading={removePending}
              onClick={() => remove({ gameId, userId })}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default UserComment;
