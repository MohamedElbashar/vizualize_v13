"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface InsertOneParams {
  title: string;
  userId: string;
  parentDocument?: number;
}

export const insertOne = async ({
  title,
  userId,
  parentDocument,
}: InsertOneParams): Promise<IDocumentType | null> => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("documents")
      .insert({
        title,
        parentDocument,
        userId,
        isPublished: false,
        isArchived: false,
      })
      .select();
    console.log(data);
    if (error) {
      throw new Error(error.message);
    }

    return data as unknown as IDocumentType;
  } catch (err) {
    throw new Error(String(err));
  }
};
