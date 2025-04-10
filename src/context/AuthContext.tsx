import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

import users from "../data/users.json";
import { User } from "../utils/types";
import Loading from "../components/Loading";

type AuthContextType = {
  user: User | null;
  logout: () => void;
  login: (username: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback((username: string, password: string) => {
    setLoading(true);
    const found = users.find((u) => u.username === username && u.password === password);

    if (found) {
      localStorage.setItem("user", JSON.stringify(found));

      setUser(found);

      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);

    localStorage.removeItem("user");
  }, []);

  const validate = useCallback(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const userInfo = JSON.parse(localUser);

      setUser(userInfo);
    }

    setLoading(false);
  }, []);

  useEffect(validate, [validate]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout
    }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
