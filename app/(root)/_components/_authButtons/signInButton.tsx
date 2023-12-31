import { Button } from "@/components/ui/button";
import React from "react";
import supabase from "@/lib/supabaseConnection";

export default function SignInButton() {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/api",
      },
    });
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleSignIn}>
      Login
    </Button>
  );
}
