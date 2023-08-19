import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { gameId, text } = CommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // if no existing vote, create a new vote
    await db.comment.create({
      data: {
        text,
        gameId,
        authorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post comment at this time. Please try later",
      { status: 500 },
    );
  }
}
