import React, { FC, useState } from "react";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { CommentFormProps } from "@/types";

const CommentForm: FC<CommentFormProps> = ({
  initText,
  mutate,
  isPending,
  options,
  setIsUpdating,
}) => {
  const [text, setText] = useState(initText);

  const qwe = () => {
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
      <div className="space-x-2 justify-self-end">
        <Button
          isLoading={isPending}
          disabled={text.length === 0}
          onClick={qwe}
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
    </>
  );
};

export default CommentForm;
