import { useState } from 'react';
import '../../css/authPages.css';
import logo from '../../assets/logo-rectangles.png';
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
        <div className="auth-content">
            <div className="auth-page">
                <div className="auth-card two-col">
                    <div className="auth-left">
                        <h2>Account Security</h2>
                        <img src={logo} alt="logo" className="auth-logo" />
                    </div>

                    <div className="auth-right">
                        <h1>Change Password</h1>
                        <form className="auth-form" onSubmit={openOtp}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    placeholder="Enter current password"
                                />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="form-group">
                                <label>Repeat New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Repeat new password"
                                />
                            </div>

                            <button type="submit" className="auth-btn">Verify</button>
                        </form>
                    </div>
                </div>

                {showOtp && (
                    <OtpPopup onCancel={closeOtp} />
                )}
            </div>
        </div>
    );
}

// Lightweight wrapper to reuse central OTP component
import OtpComponent from './otp.jsx';
function OtpPopup({ onCancel }) {
    return <OtpComponent onCancel={onCancel} />;
}