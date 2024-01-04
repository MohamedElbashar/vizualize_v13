"use client";

import Editor from "@/components/editor";
import { Toolbar } from "@/components/toolbar";
import useGetDocumentById from "@/hooks/use-get-documet-by-id";
import useUpdateDocument from "@/hooks/use-update-document-by-id";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface IDocumentIdPageProps {
  params: {
    documentId: number;
  };
}

const DocumentIdPage = ({ params }: IDocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );

  const { document } = useGetDocumentById(params.documentId);
  const { updatedDocument, handleUpdate } = useUpdateDocument(
    params.documentId,
  );
  const initialDocument = updatedDocument ? updatedDocument : document;
  const onChange = async (content: string) => {
    handleUpdate({
      content,
    });
  };
  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40 pt-28">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor
          onChange={onChange}
          initialContent={initialDocument?.content || ""}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
