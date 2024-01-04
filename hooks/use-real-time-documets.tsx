import { useEffect } from "react";
import supabase from "@/lib/supabaseConnection";

export default function useRealtimeDocuments(
  documents: IDocumentType[],
  setDocuments: any
) {
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
          setDocuments([...documents, payload.new]);
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
          setDocuments((prevDocuments: any) => {
            return prevDocuments.filter(
              (doc: any) => doc.id !== payload.old.id
            );
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
          setDocuments((prevDocuments: any) => {
            return prevDocuments.map((doc: any) => {
              if (doc.id === payload.new.id) {
                // This is the updated document, return the new version
                return payload.new;
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
  }, [documents, setDocuments]);
}
