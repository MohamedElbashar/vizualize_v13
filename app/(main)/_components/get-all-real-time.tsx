"use client";

import supabase from "@/lib/supabaseConnection";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Item from "./item";

interface IGetRealTimeDocuments {
  serverDocuments: IDocumentType[];
  onRedirect: (documentId: number) => void;
  FileIcon: LucideIcon;
  params: any;
}

export default function GetRealTimeDocuments({
  serverDocuments,
  onRedirect,
  FileIcon,
  params,
}: IGetRealTimeDocuments) {
  const [documents, setDocuments] = useState(serverDocuments);
  useEffect(() => {
    const channel = supabase
      .channel("realtime documents")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "documents",
        },
        (payload) => {
          setDocuments([...documents, payload.new as IDocumentType]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "documents",
        },
        (payload) => {
          setDocuments((prevDocuments) => {
            return prevDocuments.filter((doc) => doc.id !== payload.old.id);
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "documents",
        },
        (payload) => {
          setDocuments((prevDocuments: IDocumentType[]) => {
            return prevDocuments.map((doc) => {
              if (doc.id === payload.new.id) {
                // This is the updated document, return the new version
                return payload.new as IDocumentType;
              } else {
                // This is not the updated document, return it as is
                return doc;
              }
            });
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [documents]);

  return (
    <>
      {documents.map((document: any) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon || undefined}
            active={params.documentId === String(document.id)}
          />
        </div>
      ))}
    </>
  );
}
