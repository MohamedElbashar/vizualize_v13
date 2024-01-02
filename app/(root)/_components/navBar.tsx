"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./logo";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";

export const NavBar = () => {
  const { isSignedIn } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const scroll = useScrollTop();

  useEffect(() => {
    if (!isSignedIn) {
      setIsLoading(false);
    }
  }, [isSignedIn]);

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isLoading && !isSignedIn && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                {" "}
                Log in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button size="sm">Start Free</Button>
            </SignInButton>
          </>
        )}
        {isSignedIn && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Get Started</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
