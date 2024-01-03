import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { insertOne } from "../_action/insert-one";

interface ItemProps {
  id?: number;
  documentIcon?: string;
  active?: boolean;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export default function Item({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
}: ItemProps) {
  const { user } = useUser();
  const router = useRouter();

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = insertOne({
      title: "Untitled",
      userId: user?.id ?? "",
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  // const onDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   event.stopPropagation();
  //   if (!id) return;
  //   const promise = deleteById(id).then(() => router.push("/documents"));
  //   toast.promise(promise, {
  //     loading: "Moving to trash...",
  //     success: "Note moved to trash!",
  //     error: "Failed to archive note.",
  //   });
  // };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className={cn(
        "group min-h-[27px] test-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
}
