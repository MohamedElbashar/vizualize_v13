import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseConnection";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    console.log("sign out");
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut}>
      Log out
    </Button>
  );
}
