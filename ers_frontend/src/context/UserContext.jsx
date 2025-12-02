import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    const addUser = (userData) => {
        setUser(userData);
    };

    const updateUser = (partial) => {
        setUser((prev) => ({ ...(prev || {}), ...(partial || {}) }));
    };
    useEffect(() => {
        if (!user) {
            if (window.location.pathname !== '/auth' &&
                window.location.pathname !== '/otp' &&
                window.location.pathname !== '/forget-password' &&
                window.location.pathname !== '/change-password' &&
                !window.location.pathname.startsWith('/reset-password/')){
                    // navigate('/auth');
                }
                
        }
    }, [user, navigate]);
    return (
        <UserContext.Provider value={{ user, addUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);