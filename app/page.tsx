import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonServer from "./components/auth-button/auth-button-server";
import { Database } from "@/lib/database.types";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: fields } = await supabase.from("fields").select();

  return (
    <>
      <AuthButtonServer />
      <pre>{JSON.stringify(fields, null, 2)}</pre>
    </>
  );
}
