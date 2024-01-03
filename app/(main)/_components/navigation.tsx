/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useGetDocuments from "@/hooks/use-get-documents";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  ChevronsLeft,
  FileIcon,
  MenuIcon,
  PlusCircle,
  Settings,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { insertOne } from "../_action/insert-one";
import GetRealTimeDocuments from "./get-all-real-time";
import Item from "./item";
import { UserItem } from "./user-items";

export const Navigation = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const params = useParams();

  const { loading, documents } = useGetDocuments();

  const { user } = useUser();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathName, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navBarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navBarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navBarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navBarRef.current.style.setProperty("width", "100%");
      navBarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

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
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div>
          <div
            role="button"
            onClick={collapse}
            className={cn(
              "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}
          >
            <ChevronsLeft className="h-6 w-6" />
          </div>
          <UserItem />
          <Item
            onClick={() => {
              console.log("setting");
            }}
            label="Setting"
            icon={Settings}
          />

          <Item onClick={handleCreate} label="New Note" icon={PlusCircle} />
        </div>
        {!loading && (
          <GetRealTimeDocuments
            serverDocuments={documents}
            FileIcon={FileIcon}
            params={params}
          />
        )}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};
