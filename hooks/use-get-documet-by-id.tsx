import { getById } from "@/app/(main)/_action/get-by-id"; // Assuming you have a getById function
import { useEffect, useState } from "react";

const useGetDocumentById = (documentId: number) => {
  const [document, setDocument] = useState<IDocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentById = async () => {
      try {
        const response = await getById(documentId);
        setDocument(response);
      } catch (error) {
        console.error("Error fetching document by ID:", error);
        setError("Error fetching document by ID. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchDocumentById();
    }
  }, [documentId]);

  return { document, loading, error };
};

export default useGetDocumentById;
