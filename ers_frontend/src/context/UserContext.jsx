import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../api/axios.jsx";
import { useMessageModal } from "./MessageModal.jsx";
import "../css/auth.css";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(null);
    const [familyBackground, setFamilyBackground] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    const navigate = useNavigate();
    
    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('authenticated_user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('authenticated_user');
            }
        }
        setIsLoading(false);
    }, []);
    
    const addUser = (userData) => {
        setUser(userData);
        localStorage.setItem('authenticated_user', JSON.stringify(userData));
    };

    const updateUser = (partial) => {
        setUser((prev) => {
            const updated = { ...(prev || {}), ...(partial || {}) };
            localStorage.setItem('authenticated_user', JSON.stringify(updated));
            return updated;
        });
    };
    
    const requestLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setUser(null);
        setPersonalInfo(null);
        setFamilyBackground(null);
        localStorage.removeItem('authenticated_user');
        localStorage.removeItem('tup_Id');
        localStorage.removeItem('email_for_verification');
        setShowLogoutModal(false);
        navigate('/auth/login');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    useEffect(() => {
        if (isLoading) return; 
        const isAuthPage = window.location.pathname.startsWith('/auth');
        if (!user && !isAuthPage) {
            navigate('/auth/login');
        } else if (user && window.location.pathname === '/auth/login') {
            navigate('/home/welcome');
        }
        console.log('UserContext user changed:', user);
    }, [user, navigate, isLoading]);

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
        <UserContext.Provider value={{ 
            user, 
            addUser, 
            updateUser, 
            logout: requestLogout,
            isLoading,
            personalInfo, 
            familyBackground, 
            retrievePersonalInfo 
        }}>
            {children}
            
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal-overlay" onClick={cancelLogout}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2>Confirm Logout</h2>
                        <p style={{ textAlign: 'center', margin: '1rem 0', color: '#666' }}>
                            Are you sure you want to log out?
                        </p>
                        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button 
                                onClick={cancelLogout} 
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmLogout} 
                                className="auth-btn"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);