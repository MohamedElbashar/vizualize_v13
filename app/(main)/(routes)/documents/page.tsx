"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { insertOne } from "../../_action/insert-one";

export default function DocumentPage() {
  const { user } = useUser();
  //TODO: ERROR PAGE
  if (!user) return null;

  const handleCreate = async () => {
    const notes = insertOne({
      title: "untitled",
      userId: user?.id ?? "",
    });

    toast.promise(notes, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/books.png" height="300" width="300" alt="Empty" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notes
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        New Note
      </Button>
    </div>
  );
}
