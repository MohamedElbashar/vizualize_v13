"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getAll = async (): Promise<IDocumentType[]> => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.from("documents").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    throw new Error(String(err));
  }
};
