import React from "react";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";
import { Icons } from "./Icons";
import { getAuthSession } from "@/lib/auth";
import { UserAccountNav } from "./UserAccountNav";

const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="sticky inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-zinc-100 py-2">
      <div className="container mx-auto flex h-full max-w-6xl items-center justify-between gap-2">
        <Link href="/">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
        </Link>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
