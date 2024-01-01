"use client";

import { ModeToggle } from "@/components/ModeToggle";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Session } from "@supabase/supabase-js";
import Logo from "../logo";
import SignInButton from "./_authButtons/signInButton";
import SignOutButton from "./_authButtons/signOutButton";

export const NavBar = ({ session }: { session: Session | null }) => {
  const scroll = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {session ? <SignOutButton /> : <SignInButton />}
        <ModeToggle />
      </div>
    </div>
  );
};

//navBar.tsx render navBar Client
