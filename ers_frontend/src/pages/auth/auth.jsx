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
    const [totpRequired, setTotpRequired] = useState(false);
    const [totpCode, setTotpCode] = useState('');
    const [credentialsConfirmed, setCredentialsConfirmed] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const { addUser } = useUser() || { addUser: () => {} };
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    // const [isAdminView, setIsAdminView] = useState(true); // admin view enabled
    // const [showAddStudent, setShowAddStudent] = useState(false);
    // const [newStudent, setNewStudent] = useState({ username: '', email: '', tup_id: '', birthday: '', password: '' });
    const navigate = useNavigate();

    const login_acc = async (e) => {
        e.preventDefault();
        
        // If credentials not yet confirmed, check if TOTP is required
        if (!credentialsConfirmed) {
            try {
                const res = await backend.post('/auth/sign-in', {
                    tup_id: tup_Id, 
                    password,
                });
                const data = res.data;
                
                if (res.status === 200 && data?.email) {
                    // Credentials valid, no TOTP required
                    localStorage.setItem('tup_Id', tup_Id);
                    localStorage.setItem('email_for_verification', data.email);
                    console.log('tup id stored:', tup_Id, 'email stored:', data.email);
                    addUser(res.data);
                    navigate('/auth/otp');
                }
            } catch (error) {
                if (error?.response?.status === 403 && error?.response?.data?.totp_required) {
                    // TOTP required for this account
                    setTotpRequired(true);
                    setCredentialsConfirmed(true);
                    setUserEmail(error.response.data.email);
                    showMessage({ 
                        title: '2FA Enabled', 
                        message: 'This account has Google Authenticator enabled. Please enter your 6-digit code.', 
                        type: 'info',
                        autoCloseMs: 3000 
                    });
                } else {
                    const msg = error?.response?.data?.error;
                    showMessage({ type: 'error', message: msg || 'An error occurred during login.' });
                    setTupId('');
                    setPassword('');
                }
            }
        } else {
            // Credentials confirmed, now verify TOTP
            try {
                const res = await backend.post('/auth/sign-in', {
                    tup_id: tup_Id, 
                    password,
                    totp_code: totpCode,
                });
                const data = res.data;
                
                if (res.status === 200 && data?.email) {
                    localStorage.setItem('tup_Id', tup_Id);
                    localStorage.setItem('email_for_verification', data.email);
                    console.log('tup id stored:', tup_Id, 'email stored:', data.email);
                    addUser(res.data);
                    navigate('/auth/otp');
                }
            } catch (error) {
                const msg = error?.response?.data?.error;
                showMessage({ type: 'error', message: msg || 'Invalid authenticator code. Please try again.' });
                setTotpCode('');
            }
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
                                    onChange={(e) => {
                                        setTupId(e.target.value);
                                        setCredentialsConfirmed(false);
                                        setTotpRequired(false);
                                        setTotpCode('');
                                    }}
                                    required
                                    disabled={credentialsConfirmed}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setCredentialsConfirmed(false);
                                        setTotpRequired(false);
                                        setTotpCode('');
                                    }}
                                    required
                                    disabled={credentialsConfirmed}
                                />
                            </div>

                            {totpRequired && credentialsConfirmed && (
                                <div className="input-group">
                                    <label htmlFor="totp">Authenticator Code</label>
                                    <input
                                        id="totp"
                                        type="text"
                                        inputMode="numeric"
                                        value={totpCode}
                                        onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        maxLength="6"
                                        required
                                        autoFocus
                                        style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem', fontFamily: 'monospace' }}
                                    />
                                    <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                                        Enter the 6-digit code from your Google Authenticator app
                                    </small>
                                </div>
                            )}

                            <div className="form-actions">
                                <button 
                                    type="button"
                                    onClick={() => navigate('/auth/forget-password')}
                                    className="forgot-password-link"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button 
                                type="submit" 
                                className="login-btn"
                                disabled={totpRequired && credentialsConfirmed && totpCode.length !== 6}
                            >
                                {credentialsConfirmed && totpRequired ? 'Verify & Login' : 'Login'}
                            </button>

                            {credentialsConfirmed && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCredentialsConfirmed(false);
                                        setTotpRequired(false);
                                        setTotpCode('');
                                        setPassword('');
                                    }}
                                    style={{
                                        background: 'transparent',
                                        color: 'var(--text-light)',
                                        border: 'none',
                                        padding: '.5rem',
                                        cursor: 'pointer',
                                        marginTop: '0.5rem',
                                        fontSize: '0.9rem',
                                        width: '100%',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Use Different Account
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}