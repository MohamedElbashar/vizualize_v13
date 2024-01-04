"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const updateById = async (
  documentId: number,
  updatedData: Partial<IDocumentType>
): Promise<IDocumentType> => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("documents")
      .update(updatedData)
      .eq("id", documentId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0]; // Return the first element of the data array
  } catch (err) {
    throw new Error(String(err));
  }
};
