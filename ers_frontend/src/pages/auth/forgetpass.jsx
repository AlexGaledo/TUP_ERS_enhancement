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
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const { showMessage } = useMessageModal() || { showMessage: () => {} };

  const checkTotpStatus = async () => {
    if (!email) {
      showMessage({ title: 'Email required', message: 'Please enter your email address', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const res = await backend.post('/auth/check-totp-status', { email });
      setTotpRequired(res.data.totp_enabled);
      setEmailConfirmed(true);
      
      if (res.data.totp_enabled) {
        showMessage({ 
          title: '2FA Enabled', 
          message: 'This account has Google Authenticator enabled. Please enter your 6-digit code.', 
          type: 'info',
          autoCloseMs: 3000 
        });
      } else {
        showMessage({ 
          title: 'Email Confirmed', 
          message: 'Click "Send OTP" to receive a verification code', 
          type: 'info',
          autoCloseMs: 2500 
        });
      }
    } catch (err) {
      showMessage({ title: 'Error', message: 'Failed to check account status', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!email || !emailConfirmed) {
      showMessage({ title: 'Error', message: 'Please confirm your email first', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const res = await backend.post('/auth/send-2fa', { email });
      if (res.status === 200) {
        setOtpSent(true);
        showMessage({ 
          title: 'OTP Sent', 
          message: 'A 6-digit code has been sent to your email', 
          type: 'success',
          autoCloseMs: 3000 
        });
      }
    } catch (err) {
      showMessage({ title: 'Failed to send OTP', message: err.response?.data?.error || 'Something went wrong', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!emailOtpCode || emailOtpCode.length !== 6) {
      showMessage({ title: 'Invalid OTP', message: 'Please enter the 6-digit code', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const res = await backend.post('/auth/verify-2fa', { email, otp: emailOtpCode });
      if (res.status === 200) {
        setOtpVerified(true);
        showMessage({ 
          title: 'OTP Verified', 
          message: 'Verification successful', 
          type: 'success',
          autoCloseMs: 2000 
        });
      }
    } catch (err) {
      showMessage({ title: 'Verification failed', message: err.response?.data?.error || 'Invalid or expired code', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const sendResetLink = async () => {
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
      showMessage({ title: 'Request failed', message: err.response?.data?.error || 'Something went wrong', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailConfirmed) {
      await checkTotpStatus();
    } else if (totpRequired) {
      // Google Auth enabled: send reset link with TOTP
      await sendResetLink();
    } else if (!otpVerified) {
      // Google Auth disabled: verify OTP first
      await verifyOtp();
    } else {
      // OTP verified: send reset link
      await sendResetLink();
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

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailConfirmed(false);
                    setTotpRequired(false);
                    setTotpCode('');
                    setOtpSent(false);
                    setOtpVerified(false);
                    setEmailOtpCode('');
                  }}
                  required
                  placeholder="Enter your email"
                  disabled={emailConfirmed}
                />
              </div>

              {/* Google Authenticator Code (when TOTP enabled) */}
              {totpRequired && emailConfirmed && (
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

              {/* Email OTP Section (when Google Auth disabled) */}
              {!totpRequired && emailConfirmed && (
                <>
                  <div className="input-group">
                    <label htmlFor="emailOtp">Email Verification Code</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        id="emailOtp"
                        type="text"
                        inputMode="numeric"
                        value={emailOtpCode}
                        onChange={(e) => setEmailOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        maxLength="6"
                        disabled={!otpSent || otpVerified}
                        style={{ 
                          textAlign: 'center', 
                          letterSpacing: '0.5rem', 
                          fontSize: '1.2rem', 
                          fontFamily: 'monospace',
                          flex: 1
                        }}
                      />
                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={loading || otpSent}
                        className="login-btn"
                        style={{ width: 'auto', padding: '0 20px' }}
                      >
                        {otpSent ? 'OTP Sent' : 'Send OTP'}
                      </button>
                    </div>
                    <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                      {!otpSent ? 'Click "Send OTP" to receive a verification code via email' : 'Enter the 6-digit code sent to your email'}
                    </small>
                    {otpVerified && (
                      <small style={{ color: '#00C851', marginTop: '8px', display: 'block', fontWeight: 'bold' }}>
                        ✓ Email verified successfully
                      </small>
                    )}
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="login-btn" 
                disabled={loading || 
                  (totpRequired && emailConfirmed && totpCode.length !== 6) ||
                  (!totpRequired && emailConfirmed && !otpVerified && emailOtpCode.length !== 6)}
              >
                {loading ? 'Loading...' : 
                 !emailConfirmed ? 'Continue' :
                 totpRequired ? 'Send Reset Link' :
                 !otpVerified ? 'Verify OTP' :
                 'Send Reset Link'}
              </button>

              {emailConfirmed && (
                <button
                  type="button"
                  onClick={() => {
                    setEmailConfirmed(false);
                    setTotpRequired(false);
                    setTotpCode('');
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
                  Change Email
                </button>
              )}
              
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
