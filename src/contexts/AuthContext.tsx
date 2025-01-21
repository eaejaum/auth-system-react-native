import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  user: User | null;
  setAuth: (authUser: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  function setAuth(authUser: User | null) {
    setUser(authUser);
  }

  return (
    <AuthContext.Provider value={{ user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
