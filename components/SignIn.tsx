import Link from "next/link";
import React from "react";
import GoogleAuthForm from "./GoogleAuthForm";
import CredentialsSignInForm from "./CredentialsSignInForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        {/* <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a NextShop account and agree to our
          User Agreement and Privacy Policy.
        </p> */}
      </div>
      <GoogleAuthForm />
      <CredentialsSignInForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        New to NextShop?{" "}
        <Link
          href="/sign-up"
          replace={true}
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
