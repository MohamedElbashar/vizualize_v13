"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSidebarNotes = async (userId: string) => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });

    let queryBuilder = supabase.from("documents").select().eq("userId", userId);

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
