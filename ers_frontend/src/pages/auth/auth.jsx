import { useState } from 'react';
import backend from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../css/auth.css';
import logo from '../../assets/tup_logo.png';
import { useUser } from '../../context/UserContext';
import { useMessageModal } from '../../context/MessageModal';

export default function Auth() {
    const [tup_Id, setTupId] = useState('');
    const [password, setPassword] = useState('');
    const { addUser } = useUser() || { addUser: () => {} };
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    // const [isAdminView, setIsAdminView] = useState(true); // admin view enabled
    // const [showAddStudent, setShowAddStudent] = useState(false);
    // const [newStudent, setNewStudent] = useState({ username: '', email: '', tup_id: '', birthday: '', password: '' });
    const navigate = useNavigate();

    const login_acc = async (e) => {
        e.preventDefault();
        try {
            const res = await backend.post('/auth/sign-in', {
                tup_id: tup_Id, // backend expects snake_case key
                password,
            });
            const data = res.data;
            if (res.status === 200 && data?.email) {
                localStorage.setItem('tup_Id', tup_Id);
                localStorage.setItem('email_for_verification', data.email);
                console.log('tup id stored:', tup_Id, 'email stored:', data.email);
                addUser(res.data)
                navigate('/auth/otp');
            } else {
                showMessage({ title: 'Login failed', message: data?.error || 'Invalid credentials', type: 'error', autoCloseMs: 3500 });
            }
        } catch (error) {
            const msg = error?.response?.data?.error;
            showMessage({ type: 'error', message: msg || 'An error occurred during login.' });
            
        } finally {
            setTupId('');
            setPassword('');
        }
    };


    return (
        <div className="login-page">
            <div className="login-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>

            <div className="login-container">
                <div className="login-brand-section">
                    <div className="brand-content">
                        <img src={logo} alt="TUP Logo" className="brand-logo" />
                        <div className="brand-text">
                            <h2>Technological University of the Philippines</h2>
                            <h3>Students Access Module</h3>
                        </div>
                    </div>
                </div>

                <div className="login-form-section">
                    <div className="login-card">
                        <div className="login-header">
                            <h1>Welcome Back</h1>
                            <p>Please sign in to your account</p>
                        </div>

                        <form className="login-form" onSubmit={login_acc}>
                            <div className="input-group">
                                <label htmlFor="tupId">TUP Student ID</label>
                                <input
                                    id="tupId"
                                    type="text"
                                    placeholder="TUPM-XX-XXXX"
                                    value={tup_Id}
                                    onChange={(e) => setTupId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <a href="/auth/forget-password" className="forgot-password-link">Forgot Password?</a>
                            </div>

                            <button type="submit" className="login-btn">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}