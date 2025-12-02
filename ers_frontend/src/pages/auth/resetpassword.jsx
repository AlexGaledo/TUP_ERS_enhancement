import '../../css/authPages.css';
import logo from '../../assets/logo-rectangles.png';
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
            showMessage({ type: 'error', message: msg || 'missing token' });
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
		<div className="auth-content">
			<div className="auth-page">
				<div className="auth-card two-col">
					<div className="auth-left">
						<h2>Password Reset</h2>
						<img src={logo} alt="logo" className="auth-logo" />
					</div>

					<div className="auth-right">
						<h1>Set New Password</h1>
						<form className="auth-form" onSubmit={(e) => { e.preventDefault(); verify_token(); }}>
							<div className="form-group">
								<label>New Password</label>
								<input
									type="password"
									placeholder="Enter new password"
									required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label>Repeat New Password</label>
								<input
									type="password"
									placeholder="Repeat new password"
									required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>

							<button type="submit" className="auth-btn">Reset Password</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
    
}
