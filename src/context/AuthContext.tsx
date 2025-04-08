import { createContext, useContext, useState, ReactNode } from "react";

import users from "../data/users.json";

type User = {
  name: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => void;
  login: (username: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const found = users.find((u) => u.username === username && u.password === password);

    if (found) {
      setUser({ username: found.username, name: found.name });

      return true;
    }

    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
