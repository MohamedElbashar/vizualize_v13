"use client";

import { Toolbar } from "@/components/toolbar";
import useGetDocumentById from "@/hooks/use-get-documet-by-id";

interface IDocumentIdPageProps {
  params: {
    documentId: number;
  };
}

const DocumentIdPage = ({ params }: IDocumentIdPageProps) => {
  const { document } = useGetDocumentById(params.documentId);

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40 pt-28">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
