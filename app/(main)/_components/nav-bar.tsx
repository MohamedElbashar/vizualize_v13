"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";
import useGetDocumentById from "@/hooks/use-get-documet-by-id";
import Title from "./title";
import { Menu } from "./menu";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const { document } = useGetDocumentById(Number(params.documentId));

  if (!document) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Menu documentId={document.id} />
          </div>
        </div>
      </nav>
    </>
  );
};
