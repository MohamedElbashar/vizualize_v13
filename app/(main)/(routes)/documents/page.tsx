"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { insertOne } from "../../_action/insertOne";

export default function DocumentPage() {
  const { user } = useUser();
  console.log(user?.id);
  //TODO: ERROR PAGE
  if (!user) return null;

  const onClickHandler = async () => {
    const documents = await insertOne({ title: "untitled", userId: user.id });
    console.log(documents);
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/books.png" height="300" width="300" alt="Empty" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notes
      </h2>
      <Button onClick={onClickHandler}>
        <PlusCircle className="h-4 w-4 mr-2" />
        New Note
      </Button>
    </div>
  );
}
