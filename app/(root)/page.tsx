import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonServer from "../trash/auth-button/auth-button-server";
import { Database } from "@/lib/database.types";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import Footer from "./_components/footer";

export default async function Home() {
  // const supabase = createServerComponentClient<Database>({ cookies });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   redirect("/login");
  // }

  // const { data: fields } = await supabase.from("fields").select();

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center  md:justify-start text-center gab-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
