import { updateById } from "@/app/(main)/_action/update-by-id";
import { useEffect, useState } from "react";

const useUpdateDocument = (documentId: number) => {
  const [updatedData, setUpdatedData] = useState<Partial<IDocumentType>>({});
  const [updatedDocument, setUpdatedDocument] = useState<IDocumentType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateDocumentById = async () => {
      try {
        if (Object.keys(updatedData).length === 0) {
          // No need to update if no data is provided
          return;
        }

        setLoading(true);
        const updatedDoc = await updateById(documentId, updatedData);
        setUpdatedDocument(updatedDoc);
      } catch (error) {
        console.error("Error updating document:", error);
        setError("Error updating document. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    updateDocumentById();
  }, [documentId, updatedData]);

  const handleUpdate = (newData: Partial<IDocumentType>) => {
    setUpdatedData(newData);
  };

  return { updatedDocument, loading, error, handleUpdate };
};

export default useUpdateDocument;
