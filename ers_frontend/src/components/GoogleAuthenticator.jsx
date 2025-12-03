// src/components/GoogleAuthenticator.jsx
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import '../css/auth/GoogleAuthenticator.css';

const GoogleAuthenticator = ({ userId }) => {
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Check TOTP status on component mount
  useEffect(() => {
    // Only check status if we have a valid token
    const token = localStorage.getItem('access_token');
    if (token && token !== 'null' && token !== 'undefined') {
      checkTotpStatus();
    }
  }, []);

  const checkTotpStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token || token === 'null' || token === 'undefined') {
        console.log('No valid access token found');
        return;
      }
      
      const response = await axiosInstance.get('/auth/totp/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotpEnabled(response.data.totp_enabled);
    } catch (error) {
      console.error('Error checking TOTP status:', error);
    }
  };

  const handleSetupAuthenticator = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const token = localStorage.getItem('access_token');
      if (!token || token === 'null' || token === 'undefined') {
        setMessage({ text: 'Please log in again to continue', type: 'error' });
        setLoading(false);
        return;
      }
      
      const response = await axiosInstance.post('/auth/totp/setup', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setQrCode(response.data.qr_code);
      setManualCode(response.data.manual_code);
      setShowSetup(true);
      setMessage({ text: 'Scan the QR code with your authenticator app', type: 'success' });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.error || 'Failed to setup authenticator', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnableAuthenticator = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const token = localStorage.getItem('access_token');
      await axiosInstance.post('/auth/totp/enable', 
        { totp_code: totpCode },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setMessage({ text: 'Google Authenticator enabled successfully!', type: 'success' });
      setTotpEnabled(true);
      setShowSetup(false);
      setTotpCode('');
      setQrCode('');
      setManualCode('');
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.error || 'Failed to enable authenticator', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisableAuthenticator = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const token = localStorage.getItem('access_token');
      await axiosInstance.post('/auth/totp/disable', 
        { password, totp_code: totpCode },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setMessage({ text: 'Google Authenticator disabled successfully', type: 'success' });
      setTotpEnabled(false);
      setPassword('');
      setTotpCode('');
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.error || 'Failed to disable authenticator', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(manualCode);
    setMessage({ text: 'Code copied to clipboard!', type: 'success' });
  };

  return (
    <div className="google-authenticator-section">
      <h3>Google Authenticator (2FA)</h3>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {!totpEnabled ? (
        <>
          {!showSetup ? (
            <div className="totp-disabled">
              <p>Enhance your account security with Google Authenticator</p>
              <button 
                onClick={handleSetupAuthenticator} 
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Loading...' : 'Enable Authenticator'}
              </button>
            </div>
          ) : (
            <div className="totp-setup">
              <div className="qr-code-section">
                <h4>Step 1: Scan QR Code</h4>
                <p>Scan this QR code with your Google Authenticator app</p>
                {qrCode && <img src={qrCode} alt="QR Code" className="qr-code" />}
                
                <div className="manual-entry">
                  <h4>Or enter manually:</h4>
                  <div className="code-display">
                    <code>{manualCode}</code>
                    <button onClick={copyToClipboard} className="btn-copy">Copy</button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleEnableAuthenticator} className="verify-form" autoFocus>
                <h4>Step 2: Verify Code</h4>
                <p>Enter the 6-digit code from your authenticator app</p>
                <input
                  type="text"
                  inputMode="numeric"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength="6"
                  required
                  className="totp-input"
                  autoComplete="off"
                  style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.2rem' }}
                />
                <div className="button-group">
                  <button type="submit" disabled={loading || totpCode.length !== 6} className="btn-primary">
                    {loading ? 'Verifying...' : 'Verify & Enable'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowSetup(false);
                      setQrCode('');
                      setManualCode('');
                      setTotpCode('');
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="totp-enabled">
          <p className="status-enabled">✓ Google Authenticator is enabled</p>
          
          <form onSubmit={handleDisableAuthenticator} className="disable-form">
            <h4>Disable Authenticator</h4>
            <p style={{color: '#666', marginBottom: '16px', textAlign: 'center'}}>
              To disable Google Authenticator, enter your account password and a fresh code from your authenticator app
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your account password"
              required
              className="input-field"
            />
            <input
              type="text"
              inputMode="numeric"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength="6"
              required
              className="totp-input"
              autoComplete="off"
              style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.2rem' }}
            />
            <button type="submit" disabled={loading} className="btn-danger">
              {loading ? 'Disabling...' : 'Disable Authenticator'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthenticator;
