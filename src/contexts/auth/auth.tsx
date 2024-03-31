import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
    login: string | null;
    password: string | null;
    authentication: (login: string, password: string) => null;
    logout: () => null;
}

const initialState = {
    login: null,
    password: null,
    authentication: () => null,
    logout: () => null,
}

const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    
    const checkAuth = () => {
       const auth = localStorage.getItem("auth");
       if(auth) {
            setIsAuth(true);
       }
    }

    const authentication = (login: string, password: string) => {
        if(login === 'admin' && password === 'admin') {
            setIsAuth(true);
            localStorage.setItem("auth", '1');
        }
    }

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{isAuth, authentication, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthProvider = () => useContext(AuthContext)