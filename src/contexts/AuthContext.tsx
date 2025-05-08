import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { user, error } = await getCurrentUser();

      if (error) {
        setError(error.message);
      } else {
        setUser(user);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { user, error } = await loginUser(email, password);

    if (error) {
      setError(error.message);
    } else {
      setUser(user);
    }

    setLoading(false);
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { user, error } = await registerUser(email, password);

    if (error) {
      setError(error.message);
    } else {
      setUser(user);
    }

    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    const { error } = await logoutUser();

    if (error) {
      setError(error.message);
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
