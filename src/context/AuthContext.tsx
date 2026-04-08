import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    userId: string | null;
    userName: string | null;
    setToken: (token: string | null, userId?: string | null, userName?: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(localStorage.getItem("token"));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

    const setToken = (newToken: string | null, newUserId?: string | null, newUserName?: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
            if (newUserId) {
                setUserId(newUserId);
                localStorage.setItem("userId", newUserId);
            }
            if (newUserName) {
                setUserName(newUserName);
                localStorage.setItem("userName", newUserName);
            }
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            setUserId(null);
            setUserName(null);
        }
    };

    return (
        <AuthContext.Provider value={{ token, userId, userName, setToken }}>
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
