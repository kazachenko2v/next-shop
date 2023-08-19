import React, { FC, useState } from "react";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { CommentFormProps } from "@/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const CommentForm: FC<CommentFormProps> = ({
  initText,
  mutate,
  isPending,
  options,
  setIsUpdating,
}) => {
  const [text, setText] = useState(initText);

  const clickHandler = () => {
    mutate(
      { ...options, text },
      {
        onSuccess: () => {
          setText("");
        },
      },
    );
  };

  return (
    <>
      <Label htmlFor="comment">Leave your comment</Label>
      <Textarea
        id="comment"
        value={text}
        className="resize-none"
        onChange={(e) => setText(e.target.value)}
        placeholder="What are your thoughts?"
      />

      <div className="flex justify-between space-x-2">
        <div>
          <Button className="group" variant={"ghost"}>
            <ThumbsUp className="group-hover:text-green-500" />
          </Button>
          <Button className="group" variant={"ghost"}>
            <ThumbsDown className="group-hover:text-red-600" />
          </Button>
        </div>
        <div>
          <Button
            isLoading={isPending}
            disabled={text.length === 0}
            onClick={clickHandler}
          >
            Publish
          </Button>
          {setIsUpdating && (
            <Button
              variant="destructive"
              onClick={() => setIsUpdating((prev) => !prev)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentForm;
