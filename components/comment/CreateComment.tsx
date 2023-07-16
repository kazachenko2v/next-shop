"use client";

import React, { FC, useState } from "react";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { useCustomToasts } from "@/hooks/useCustomToasts";
import { CommentRequest } from "@/lib/validators/comment";
import CommentForm from "./CommentForm";

interface CreateCommentProps {
  gameId: string;
}

const CreateComment: FC<CreateCommentProps> = ({ gameId }) => {
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: create, isPending } = useMutation({
    mutationFn: async ({ gameId, text }: CommentRequest) => {
      const payload: CommentRequest = { gameId, text };

      const { data } = await axios.post(`/api/comment/create`, payload);
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

  return (
    <CommentForm initText={''} mutate={create} isPending={isPending} options={{ gameId }} />
  );
};

export default CreateComment;
