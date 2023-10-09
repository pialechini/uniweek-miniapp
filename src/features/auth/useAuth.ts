import { decode } from "@/lib/json-utils";
import { signIn } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function useAuth(credentials?: string | null) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!credentials) {
      return;
    }

    try {
      const { email, password } = decode(credentials) as {
        email: string;
        password: string;
      };

      (async () => {
        setUser(await signIn(email, password));
      })();
    } catch (error) {
      console.log(error);
    }
  }, [credentials]);

  return user;
}
