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

    const { data, error } = await supabase.from("documents").insert({
      title,
      parentDocument,
      userId,
      isPublished: false,
      isArchived: false,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    throw new Error(String(err));
  }
};
