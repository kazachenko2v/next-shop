import { db } from "@/lib/db";
import { CredentialsSignUpValidator } from "@/lib/validators/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } =
      CredentialsSignUpValidator.parse(body);

    const hashedPassword = await bcrypt.hash(password, 5);

    await db.user.create({
      data: {
        name: username,
        username,
        email,
        password: hashedPassword,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not create user at this time. Please try later",
      { status: 500 },
    );
  }
}
