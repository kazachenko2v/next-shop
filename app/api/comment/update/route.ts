import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdateCommentValidator } from "@/lib/validators/comment";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { gameId, userId, text } = UpdateCommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    // if no existing vote, create a new vote
    await db.comment.update({
      where: {
        authorId_gameId: {
          authorId: userId,
          gameId,
        },
      },
      data: { text: text },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not update comment at this time. Please try later",
      { status: 500 },
    );
  }
}
