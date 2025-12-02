import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../api/axios.jsx";
import { useMessageModal } from "./MessageModal.jsx";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(null);
    const [familyBackground, setFamilyBackground] = useState(null);
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    const navigate = useNavigate();
    
    const addUser = (userData) => {
        setUser(userData);
    };

    const updateUser = (partial) => {
        setUser((prev) => ({ ...(prev || {}), ...(partial || {}) }));
    };
    useEffect(() => {
        if (!user) {
            if (window.location.pathname.startsWith('/auth') === false &&
                window.location.pathname.startsWith('/auth/forget-password') === false &&
                window.location.pathname.startsWith('/auth/reset-password/') === false) {
                    navigate('/auth/login');
                }       
        }
        console.log('UserContext user changed:', user);
    }, [user, navigate]);

    const retrievePersonalInfo = async () => {
        try {
            const payload = {
                user_id: user?.id || undefined,
                email: user?.email || undefined,
                tup_id: user?.tup_id || undefined,
            }
            const response = await backend.post('/user/retrieve-info', payload);
            if (response.status === 200) {
                setPersonalInfo(response.data.personal_info);
                setFamilyBackground(response.data.family_background);
                console.log('Fetched personal info and family background:', response.data);
            }
        } catch (error) {
            showMessage({ type: 'error', message: 'Failed to fetch personal information.' });
            console.error('Error fetching personal info:', error);
        }
    }
    return (
        <UserContext.Provider value={{ user, addUser, updateUser, personalInfo, 
        familyBackground, retrievePersonalInfo }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);