// src/components/TotpInput.jsx
import { useState } from 'react';
import '../css/auth/TotpInput.css';

const TotpInput = ({ onVerify, loading, error }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  return (
    <div className="totp-input-container">
      <div className="totp-input-card">
        <div className="totp-header">
          <h3>Two-Factor Authentication</h3>
          <p>Enter the 6-digit code from your Google Authenticator app</p>
        </div>

        <form onSubmit={handleSubmit} className="totp-form">
          <input
            type="text"
            value={code}
            onChange={handleChange}
            placeholder="000000"
            maxLength="6"
            className="totp-code-input"
            autoFocus
            required
          />

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={loading || code.length !== 6}
            className="totp-submit-btn"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="totp-help">
          <p>Don't have access to your authenticator?</p>
          <p className="help-text">Contact support for account recovery</p>
        </div>
      </div>
    </div>
  );
};

export default TotpInput;
