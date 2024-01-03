import { getSidebarNotes } from "@/app/(main)/_action/get-sidebar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useGetSideBarDocuments = ({
  parentDocument,
}: {
  parentDocument?: number;
}) => {
  const [documents, setDocuments] = useState<IDocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getSidebarNotes(parentDocument, user?.id ?? "");
        setDocuments(response);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Error fetching documents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, loading, error };
};

export default useGetSideBarDocuments;
