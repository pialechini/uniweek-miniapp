import { getFromLocalStorage, setInLocalStorage } from '@/helpers';
import { signIn } from '@/services/supabase';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { useState } from 'react';

type AuthContextValue = {
  loggedIn: boolean;
  login: () => void;
  setToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

let token = getFromLocalStorage('token');

function AuthProvider({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    if (!token) {
      console.log('Token not found for logging into supabase');
      setLoggedIn(false);
      return false;
    }

    const succeed = await signIn(token);

    setLoggedIn(succeed);
    return succeed;
  };

  const value: AuthContextValue = {
    loggedIn,
    setToken: async (newToken: string) => {
      token = newToken;
      setInLocalStorage('token', newToken);
      await login();
    },
    login,
  };

  useEffect(() => {
    login();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Usage of AuthContext outside of its provider.');
  }

  return context;
}

export { AuthProvider, useAuthContext, token };
