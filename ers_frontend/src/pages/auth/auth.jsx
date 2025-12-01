import { useState } from 'react';
import backend from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../css/authPages.css';
import logo from '../../assets/logo-rectangles.png'
import { useUser } from '../../context/UserContext';
import { useMessageModal } from '../../context/MessageModal';

export default function Auth() {
    const [tup_Id, setTupId] = useState('');
    const [password, setPassword] = useState('');
    const { addUser } = useUser() || { addUser: () => {} };
    const { showMessage } = useMessageModal() || { showMessage: () => {} };
    // const [isAdminView, setIsAdminView] = useState(true); // admin view enabled
    // const [showAddStudent, setShowAddStudent] = useState(false);
    // const [newStudent, setNewStudent] = useState({ username: '', email: '', tup_id: '', birthday: '', password: '' });
    const navigate = useNavigate();

    const login_acc = async (e) => {
        e.preventDefault();
        try {
            const res = await backend.post('/auth/sign-in', {
                tup_id: tup_Id, // backend expects snake_case key
                password,
            });
            const data = res.data;
            if (res.status === 200 && data?.response === 'logged in successfully' && data?.email) {
                localStorage.setItem('tup_Id', tup_Id);
                localStorage.setItem('email_for_verification', data.email);
                console.log('tup id stored:', tup_Id, 'email stored:', data.email);
                addUser(res.data)
                navigate('/otp');
            } else {
                showMessage({ title: 'Login failed', message: data?.error || 'Invalid credentials', type: 'error', autoCloseMs: 3500 });
            }
        } catch (error) {
            const msg = error?.response?.data?.error;
            showMessage({ type: 'error', message: msg || 'An error occurred during login.' });
            
        } finally {
            setTupId('');
            setPassword('');
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-card two-col">
                <div className="auth-left">
                    <h2>Students Access Module</h2>
                    <img src={logo} alt="logo" className="auth-logo" />
                </div>

                <div className="auth-right">
                    <h1>Student Login</h1>
                    <form className="auth-form" onSubmit={login_acc}>
                        <div className="form-group">
                            <label>TUP Student ID</label>
                            <input
                                type="text"
                                placeholder="TUPM-XX-XXXX"
                                value={tup_Id}
                                onChange={(e) => setTupId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <a href="/forget-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="auth-btn">
                            Log In
                        </button>
                    </form>

                    {/*isAdminView && (
                        <div className="admin-panel">
                            { <button className="admin-btn" onClick={toggleAddStudent}>
                                {showAddStudent ? 'Cancel' : 'Add Student'}
                            </button> }

                            {showAddStudent && (
                                <form className="auth-form add-student" onSubmit={submitNewStudent}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input value={newStudent.username} onChange={(e) => handleNewStudentChange('username', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" value={newStudent.email} onChange={(e) => handleNewStudentChange('email', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>TUP ID</label>
                                        <input value={newStudent.tup_id} onChange={(e) => handleNewStudentChange('tup_id', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Birthday</label>
                                        <input type="date" value={newStudent.birthday} onChange={(e) => handleNewStudentChange('birthday', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" value={newStudent.password} onChange={(e) => handleNewStudentChange('password', e.target.value)} required />
                                    </div>
                                    <button type="submit" className="auth-btn">Create Student</button>
                                </form>
                            )}
                        </div>
                    )*/}
                </div>
            </div>
        </div>
    );
}