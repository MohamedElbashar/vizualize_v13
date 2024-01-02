"use client";

import supabase from "@/lib/supabaseConnection";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function GetRealTimeDocuments({
  serverDocuments,
}: {
  serverDocuments: IDocumentType[];
}) {
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
        (payload: RealtimePostgresInsertPayload<{ [key: string]: any }>) => {
          setDocuments([...documents, payload.new as IDocumentType]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <div className="mt-4">
      {documents?.map((document: IDocumentType) => (
        <p key={document.id}>{document.title}</p>
      ))}
    </div>
  );
}
