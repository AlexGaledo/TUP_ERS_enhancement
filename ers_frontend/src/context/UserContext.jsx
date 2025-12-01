import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const addUser = (userData) => {
        setUser(userData);
    };

    const updateUser = (partial) => {
        setUser((prev) => ({ ...(prev || {}), ...(partial || {}) }));
    };

    return (
        <UserContext.Provider value={{ user, addUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);