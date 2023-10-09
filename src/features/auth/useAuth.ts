import { decode } from "@/lib/json-utils";
import { signIn } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useAuth(credentials?: string | null) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!credentials) {
      setLoggedIn(false);
      return;
    }

    try {
      const { email, password } = decode(credentials) as {
        email: string;
        password: string;
      };

      (async () => {
        const user = await signIn(email, password);
        setLoggedIn(Boolean(user));
      })();
    } catch (error) {
      setLoggedIn(false);
    }
  }, [credentials]);

  return loggedIn;
}
