import { z } from "zod";

export const CredentialsSignUpValidator = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
});

export const CredentialsSignInValidator = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
});

export type CredentialsSignUpRequest = z.infer<typeof CredentialsSignUpValidator>;
export type CredentialsSignInRequest = z.infer<typeof CredentialsSignInValidator>;
