"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bell, FileEdit, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/types";
import { Menu } from "./menu";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const session = useSession();

  const user = session?.data?.user as UserSession;

  const toggleShowSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 200);
  };

  return (
    <header className="navbar">
      <Link href="/" className="w-10">
        <Image
          src="/images/logo.png"
          width={40}
          height={40}
          alt="logo"
          className="w-full"
        />
      </Link>

      <div
        className={`md:show absolute left-0 top-full mt-0.5 w-full border-b border-grey bg-white px-[5vw] py-4 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0 ${
          showSearch ? "show" : "hide"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full bg-grey p-4 pl-6 pr-[12%] placeholder:text-dark-grey md:w-auto md:pl-12 md:pr-6"
        />

        <Search
          className="absolute right-[10%] top-1/2 -translate-y-1/2 stroke-dark-grey md:pointer-events-none md:left-5"
          size={20}
        />
      </div>

      <div className="ml-auto flex items-center gap-3 md:gap-6">
        <button
          onClick={toggleShowSearch}
          className="flex h-12 w-12 items-center justify-center  rounded-full bg-grey md:hidden"
        >
          <Search size={20} className="stroke-dark-grey" />
        </button>

        <Link href="/editor" className="link hidden gap-2 md:flex">
          <FileEdit size={20} />
          <p>Write</p>
        </Link>

        {user ? (
          <>
            <Link href="/dashboard/notification">
              <button className="relative flex h-12 w-12 items-center justify-center rounded-full bg-grey hover:bg-black/10">
                <Bell size={20} className="stroke-dark-grey" />
              </button>
            </Link>

            <div className="relative">
              <button
                onClick={toggleMenu}
                onBlur={handleBlur}
                className="mt-1 h-12 w-12"
              >
                <Image
                  src={user.profile_img}
                  alt={`${user.fullname}image`}
                  width={12}
                  height={12}
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
              {showMenu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <Link href="/sign-in" className="btn-dark py-2">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-light hidden py-2 md:block">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
