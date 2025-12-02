import '../../css/auth.css';
import logo from '../../assets/tup_logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import backend from '../../api/axios.jsx'
import { useMessageModal } from '../../context/MessageModal';
import { useState } from 'react';

export default function ResetPassword() {
    const { token } = useParams();
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const navigate = useNavigate();

    const verify_token = async () => { {
        if (password.length < 8) {
            showMessage({ type: 'error', message: 'Password must be at least 8 characters long.' });
            return;
        }

        if(password !== confirmPassword) {
            showMessage({ type: 'error', message: 'Passwords do not match.' });
            return;
        }

        if (!token) {
            showMessage({ type: 'error', message: 'missing token' });
            return;
        }

        try {
            const response = await backend.post(`/auth/reset-password/${token}`,{
                password: password
            })

            if (response.status === 200) {
                showMessage({ type: 'success', message: 'Password has been reset successfully.' });
                navigate('/auth');
                setConfirmPassword('');
                setPassword('');
            }

        } catch (error) {
            showMessage({ type: 'error', message: 'Failed to reset password. Please try again.' });
        }};
    }   
    


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
                            <h1>Set New Password</h1>
                            <p>Create a new password for your account</p>
                        </div>

                        <form className="login-form" onSubmit={(e) => { e.preventDefault(); verify_token(); }}>
                            <div className="input-group">
                                <label htmlFor="password">New Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmPassword">Repeat New Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Repeat new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="login-btn">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
		</div>
	);
    
}
