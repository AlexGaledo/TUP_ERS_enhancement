import { useState } from 'react';
import backend from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../css/authPages.css';
import { useMessageModal } from '../../context/MessageModal';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showMessage } = useMessageModal() || { showMessage: () => {} };

  const get_reset_link = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await backend.post('/auth/forgot-password', { email });
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

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Reset Password</h1>
        <form className="auth-form" onSubmit={get_reset_link}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="auth-btn">
            {loading ? 'Loading...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
