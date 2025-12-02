import { useState } from 'react';
import '../../css/auth.css';
import logo from '../../assets/tup_logo.png';
import { useMessageModal } from '../../context/MessageModal';

export default function ChangePass() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const { showMessage } = useMessageModal() || { showMessage: () => {} };

    const openOtp = (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) return;
        if (newPassword !== confirmPassword) {
            showMessage({ title: 'Password mismatch', message: 'New passwords do not match.', type: 'warning', autoCloseMs: 2500 });
            return;
        }
        setShowOtp(true);
    };

    const closeOtp = () => setShowOtp(false);

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
                                <a href="/auth" className="forgot-password-link">Back to Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showOtp && (
                <OtpPopup onCancel={closeOtp} />
            )}
        </div>
    );
}

// Lightweight wrapper to reuse central OTP component
import OtpComponent from './otp.jsx';
function OtpPopup({ onCancel }) {
    return <OtpComponent onCancel={onCancel} />;
}