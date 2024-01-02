import { getAll } from "@/app/(main)/_action/getAll";
import { useEffect, useState } from "react";

const useGetDocuments = () => {
  const [documents, setDocuments] = useState<IDocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getAll();
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

export default useGetDocuments;
