import Link from "next/link";
import React from "react";
import { auth } from "~/server/auth";

const Header: React.FC = async ({}) => {
  const session = await auth();

  return (
    <header className="flex justify-between bg-gray-100/40 p-4">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <div>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/20 px-10 py-3 font-semibold no-underline transition hover:bg-white/40"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
