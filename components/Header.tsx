import React from "react";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";
import { Icons } from "./Icons";
import { getAuthSession } from "@/lib/auth";
import { UserAccountNav } from "./UserAccountNav";

const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="sticky top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-6xl h-full mx-auto flex items-center justify-between gap-2">
        <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />

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
