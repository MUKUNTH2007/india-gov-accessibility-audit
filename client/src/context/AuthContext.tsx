import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "india-gov-audit-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  const login = (email: string, password: string) => {
    if (
      email === "admin@indiagov.in" &&
      password === "admin123"
    ) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
