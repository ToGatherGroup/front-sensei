import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  isLoading: boolean;
  isAuth: boolean;
  error: string;
  authentication: (login: string, password: string) => void;
  logout: () => void;
};

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  error: "",
  authentication: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const checkAuth = () => {
    const auth = localStorage.getItem("auth");
    if (auth == "1") {
      setIsAuth(true);
    }
  };

  const authentication = (login: string, password: string) => {
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      if (login == "admin" && password == "admin") {
        setIsAuth(true);
        localStorage.setItem("auth", "1");
        setIsLoading(false);
        router.push("/");
      } else {
        setIsLoading(false);
        setError("Login e/ou senha inválidos!");
      }
    }, 1000);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    checkAuth();
    setError("");
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuth, error, authentication, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
