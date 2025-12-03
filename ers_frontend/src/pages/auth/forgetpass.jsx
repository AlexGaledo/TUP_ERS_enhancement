import { useState } from 'react';
import backend from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../css/auth.css';
import logo from '../../assets/tup_logo.png';
import { useMessageModal } from '../../context/MessageModal';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [totpRequired, setTotpRequired] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const navigate = useNavigate();
  const { showMessage } = useMessageModal() || { showMessage: () => {} };

  const get_reset_link = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { email };
      if (totpRequired && totpCode) {
        payload.totp_code = totpCode;
      }

      const res = await backend.post('/auth/forgot-password', payload);
      if (res.status === 200) {
        showMessage({ title: 'Email sent', message: 'A password reset link has been sent to your email.', type: 'success', autoCloseMs: 3000 });
        navigate('/auth');
      }
    } catch (err) {
      // Check if TOTP is required
      if (err.response?.status === 403 && err.response?.data?.totp_required) {
        setTotpRequired(true);
        showMessage({ title: 'TOTP Required', message: 'This account has 2FA enabled. Please enter your authenticator code.', type: 'info' });
      } else {
        showMessage({ title: 'Request failed', message: err.response?.data?.error || 'Something went wrong', type: 'error' });
      }
    } finally {
      setLoading(false);
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
              <h1>Password Recovery</h1>
              <p>Enter your email to receive a reset link</p>
            </div>

            <form className="login-form" onSubmit={get_reset_link}>
              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  disabled={totpRequired}
                />
              </div>

              {totpRequired && (
                <div className="input-group">
                  <label htmlFor="totp">Authenticator Code</label>
                  <input
                    id="totp"
                    type="text"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    required
                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem', fontFamily: 'monospace' }}
                  />
                  <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                    Enter the 6-digit code from your Google Authenticator app
                  </small>
                </div>
              )}

              <button type="submit" className="login-btn" disabled={totpRequired && totpCode.length !== 6}>
                {loading ? 'Loading...' : 'Send Reset Link'}
              </button>
              
              <div className="form-actions" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                  <a href="/auth" className="forgot-password-link">Back to Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
