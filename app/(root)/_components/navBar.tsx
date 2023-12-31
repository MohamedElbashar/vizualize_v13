"use client";

import { ModeToggle } from "@/components/ModeToggle";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import SignInButton from "./_authButtons/signInButton";
import Logo from "./logo";
import SignOutButton from "./_authButtons/signOutButton";
import useGetSession from "@/hooks/useGetSession";
import { Spinner } from "@/components/spinner";
export const NavBar = () => {
  const scroll = useScrollTop();
  const { session, loading } = useGetSession();
  console.log("Nav Barrrrrrr", session);
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {loading && <Spinner />}
        {session && !loading ? <SignOutButton /> : <SignInButton />}
        <ModeToggle />
      </div>
    </div>
  );
};
