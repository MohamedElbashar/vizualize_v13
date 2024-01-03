"use client";

import { Spinner } from "@/components/spinner";
import { useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "./_components/navigation";
// ... (other imports)

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isSignedIn) {
      setIsLoading(false);
    }
  }, [isSignedIn]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isSignedIn) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
