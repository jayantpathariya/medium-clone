"use client";

import Link from "next/link";
import AnimationWrapper from "./shared/animation-wrapper";
import { signOut, useSession } from "next-auth/react";
import { UserSession } from "@/lib/types";

export const Menu = () => {
  const session = useSession();

  const user = session?.data?.user as UserSession;

  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="absolute right-0 w-60 border border-grey bg-white duration-200">
        <Link href="/editor" className="link flex gap-2 py-4 pl-8 md:hidden">
          <p>Write</p>
        </Link>

        <Link href={`/profile/${user?.username}`} className="link py-4 pl-8">
          Profile
        </Link>
        <Link href="/dashboard/blogs" className="link py-4 pl-8">
          Dashboard
        </Link>
        <Link href="/settings/edit-profile" className="link py-4 pl-8">
          Settings
        </Link>

        <hr className="border-grey" />

        <button
          onClick={() => signOut()}
          className="w-full p-4 py-4 pl-8 text-left hover:bg-grey"
        >
          <p className="mb-1 text-xl font-bold">{user?.username}</p>
          <p className="text-dark-grey">Sign Out</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};
