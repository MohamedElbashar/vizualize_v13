/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useSession } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isSignedIn } = useSession();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Get Inspired by stunning AI designs. welcome to{" "}
        <span className="underline">Vizualize-AI</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Architects, Transform Your Sketches into Stunning 3D Renders Instantly.
      </h3>

      {isSignedIn && (
        <Button asChild>
          <Link href="/documents">
            Explore Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isSignedIn && (
        <SignInButton mode="modal">
          <Button>
            Explore Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
