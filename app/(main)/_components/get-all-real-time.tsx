"use client";

import supabase from "@/lib/supabaseConnection";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Item from "./item";
import useRealtimeDocuments from "@/hooks/use-real-time-documets";

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
  useRealtimeDocuments(documents, setDocuments);

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
