import { useState } from 'react';
import '../../css/auth.css';
import logo from '../../assets/tup_logo.png';
import { useMessageModal } from '../../context/MessageModal';
import backend from '../../api/axios.jsx';
import { useUser } from '../../context/UserContext.jsx';
import { validatePassword } from '../../utils/passwordValidation';

export default function ChangePass() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    const { user } = useUser() || { user: null };

    const openOtp = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) return;
        
        // Validate password strength BEFORE checking match or sending OTP
        const validation = validatePassword(newPassword);
        if (!validation.isValid) {
            showMessage({ title: 'Invalid Password', message: validation.message, type: 'warning', autoCloseMs: 3000 });
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showMessage({ title: 'Password mismatch', message: 'New passwords do not match.', type: 'warning', autoCloseMs: 2500 });
            return;
        }
        // Step 1: trigger OTP send
        try {
            const email = user?.email;
            if (!email) throw new Error('Missing user email');
            await backend.post('/auth/send-2fa', { email });
            setShowOtp(true);
        } catch (error) {
            const apiMsg = error?.response?.data?.message || error?.response?.data?.error;
            showMessage({ title: 'Error', message: apiMsg || 'Failed to send verification code.', type: 'error', autoCloseMs: 2500 });
        }
    };

    const closeOtp = () => setShowOtp(false);

    // Called when OTP modal reports success
    const handleOtpVerified = async (ok) => {
        if (!ok) return; // do nothing on failure
        try {
            const response = await backend.post('/auth/change-password', {
                user_id: user?.id,
                old_password: oldPassword,
                new_password: newPassword,
            });
            if (response.status === 200) {
                showMessage({ title: 'Success', message: `${response.data?.response}`, type: 'success', autoCloseMs: 2500 });
                setShowOtp(false);
            }
        } catch (error) {
            showMessage({ title: 'Error', message: `${error.response?.data?.error || 'Failed to change password.'}`, type: 'error', autoCloseMs: 2500 });
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
                            <h1>Change Password</h1>
                            <p>Update your account password</p>
                        </div>

                        <form className="login-form" onSubmit={openOtp}>
                            <div className="input-group">
                                <label htmlFor="oldPassword">Current Password</label>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    placeholder="Enter current password"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmPassword">Repeat New Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Repeat new password"
                                />
                            </div>

                            <button type="submit" className="login-btn">Verify</button>
                            
                            <div className="form-actions" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                <a href="/auth" className="forgot-password-link">Back to Profile</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showOtp && (
                <OtpPopup onCancel={closeOtp} onVerified={handleOtpVerified} />
            )}
        </div>
    );
}

// Lightweight wrapper to reuse central OTP component
import OtpComponent from './otp.jsx';
function OtpPopup({ onCancel, onVerified }) {
    return <OtpComponent onCancel={onCancel} onVerified={onVerified} />;
}