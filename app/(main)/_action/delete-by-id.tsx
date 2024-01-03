"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const deleteById = async (documentId: number) => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(String(error));
  }
};
