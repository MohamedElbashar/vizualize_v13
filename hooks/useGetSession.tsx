import supabase from "@/lib/supabaseConnection";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useGetSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("******session", session);
        setSession(session);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };
    getSession();
  }, []);

  return { session, loading };
}
