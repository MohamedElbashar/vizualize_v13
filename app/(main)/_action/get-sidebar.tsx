"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSidebarNotes = async (
  parentDocument: number | undefined,
  userId: string
) => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });

    let queryBuilder = supabase.from("documents").select().eq("userId", userId);

    if (parentDocument !== undefined) {
      queryBuilder = queryBuilder.eq("parentDocument", parentDocument);
    }

    const { data: documents, error } = await queryBuilder.order("id", {
      ascending: false,
    });

    if (error) {
      throw new Error(error.message);
    }

    return documents;
  } catch (error) {
    throw new Error(String(error));
  }
};
