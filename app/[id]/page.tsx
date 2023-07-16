import Comment from "@/components/comment/Comment";
import CommentWrapper from "@/components/comment/CommentWrapper";
import CreateComment from "@/components/comment/CreateComment";

import UserComment from "@/components/comment/UserComment";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

async function getData(id: string) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_KEY_ID}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const data = await getData(params.id);
  const session = await getAuthSession();

  const allComments = await db.comment.findMany({
    where: {
      gameId: params.id,
    },
    include: {
      author: true,
    },
  });

  const userComment = allComments.find(
    (com) => com.authorId === session?.user.id,
  );

  const restComment = allComments.filter(
    (com) => com.authorId !== session?.user.id,
  );

  return (
    <div>
      <h1>{data.name}</h1>
      <Image
        src={data.background_image}
        alt="Picture of the author"
        width={500}
        height={400}
        className="object-cover"
      />
      <CommentWrapper>
        {userComment ? (
          <UserComment
            comment={userComment}
            gameId={params.id}
            userId={session?.user.id!}
          />
        ) : (
          <CreateComment gameId={params.id} />
        )}
      </CommentWrapper>

      {restComment.map((comment) => (
        <CommentWrapper>
          <Comment comment={comment} />
        </CommentWrapper>
      ))}

      {/* <CommentList restComment={restComment}/> */}
    </div>
  );
};

export default page;
