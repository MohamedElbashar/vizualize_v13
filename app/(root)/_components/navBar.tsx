"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton, useSession, useUser } from "@clerk/nextjs";
import Logo from "./logo";

export const NavBar = () => {
  const { isLoaded, session, isSignedIn } = useSession();
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
        {isLoaded && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                {" "}
                Log in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button size="sm"> Get Started</Button>
            </SignInButton>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
