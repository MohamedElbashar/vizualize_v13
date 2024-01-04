"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { updateById } from "@/app/(main)/_action/update-by-id";
import { Toolbar } from "@/components/toolbar";
import useGetDocumentById from "@/hooks/use-get-documet-by-id";

interface DocumentIdPageProps {
  params: {
    documentId: number;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const { document } = useGetDocumentById(params.documentId);

  const onChange = async (content: string) => {
    await updateById(params.documentId, {
      content,
    });
  };

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document?.content ?? ""}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
