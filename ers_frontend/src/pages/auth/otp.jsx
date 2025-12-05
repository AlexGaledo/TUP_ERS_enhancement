import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessageModal } from '../../context/MessageModal'
import { useUser } from '../../context/UserContext'
import '../../css/auth.css'
import logo from '../../assets/tup_logo.png'
import backend from '../../api/axios.jsx'

export default function Otp({ onCancel, onVerified, style }) {
    const [otp, setOtp] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [timer, setTimer] = useState(0)
    const intervalRef = useRef(null)
    const navigate = useNavigate()
    const { showMessage } = useMessageModal() || { showMessage: () => {} }
    const { verifyOtp, cancelAuth } = useUser() || { verifyOtp: () => {}, cancelAuth: () => {} }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    const startCountdown = () => {
        setDisabled(true)
        setTimer(60)
        let countdown = 60
        const id = setInterval(() => {
            countdown -= 1
            setTimer(countdown)
            if (countdown === 0) {
                clearInterval(id)
                intervalRef.current = null
                setDisabled(false)
            }
        }, 1000)
        intervalRef.current = id
    }

    const getOtp = async () => {
        const email = localStorage.getItem('email_for_verification')
        if (!email) {
            showMessage({
                title: 'No email found',
                message: 'Please log in again to continue verification.',
                type: 'error',
            })
            return
        }
        startCountdown()
        try {
            const res = await backend.post(`/auth/send-2fa`, { email })
            if (res.status >= 200 && res.status < 300) {
                showMessage({
                    title: 'OTP sent',
                    message: 'Check your inbox for the verification code.',
                    type: 'success',
                    autoCloseMs: 2500,
                })
            }
        } catch (err) {
            const apiMsg = err?.response?.data?.message || err?.response?.data?.error
            showMessage({
                title: 'Network error',
                message: apiMsg || 'Could not reach the OTP service.',
                type: 'error',
            })
        }
    }

    const handleVerifyOtp = async () => { 
        const email = localStorage.getItem('email_for_verification')
        console.log(`retrieved email from local storage: ${email} and otp: ${otp}`)
        if (!email) {
            showMessage({
                title: 'No email found',
                message: 'Please log in again to continue verification.',
                type: 'error',
            })
            return
        }
        if (!otp || otp.length < 6) {
            showMessage({
                title: 'Invalid OTP',
                message: 'Please enter the 6-digit code sent to your email.',
                type: 'warning',
                autoCloseMs: 2500,
            })
            return
        }

        try {
            const res = await backend.post(`/auth/verify-2fa`, { email, otp: String(otp) })
            console.log(`sent corresponding details to the backend = ${email}, ${otp}:`)
            if (res.status >= 200 && res.status < 300) {
                // Store the access token from the response
                if (res.data?.access_token) {
                    verifyOtp(res.data.access_token)
                    console.log('Access token stored successfully')
                }
                
                showMessage({
                    title: 'OTP verified',
                    message: 'You have been successfully verified.',
                    type: 'success',
                    autoCloseMs: 2500,
                })
                if (typeof onVerified === 'function') {
                    onVerified(true)
                } else {
                    // Default behavior if no callback supplied
                    navigate('/home/welcome')
                }
                return true
            }


        } catch (err) {
            const apiMsg = err?.response?.data?.message || err?.response?.data?.error
            showMessage({
                title: 'Verification failed',
                message: apiMsg || err.data?.response || 'OTP verification failed. Please try again.',
                type: 'error',
            })
            if (typeof onVerified === 'function') {
                onVerified(false)
            }
        }
    }

    const containerStyle = onCancel ? {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'var(--bg-color)',
        ...style
    } : {};

    return (
        <div className="login-page" style={containerStyle}>
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
                            <h1>OTP Verification</h1>
                            <p>Enter the 6-digit code sent to your email</p>
                        </div>

                        <form
                            className="login-form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleVerifyOtp()
                            }}
                        >
                            <div className="input-group">
                                <label htmlFor="otp">Enter 6-Digit Code</label>
                                <input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    maxLength={6}
                                    style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.2rem' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '.75rem', marginTop: '.5rem' }}>
                                <button
                                    type="button"
                                    className="login-btn"
                                    onClick={getOtp}
                                    disabled={disabled}
                                    style={{ 
                                        opacity: disabled ? 0.7 : 1, 
                                        flex: 1,
                                        marginTop: 0,
                                        background: disabled ? '#ccc' : 'var(--text-light)',
                                        boxShadow: 'none'
                                    }}
                                >
                                    {disabled ? `Resend in ${timer}s` : 'Send Code'}
                                </button>
                                <button type="submit" className="login-btn" style={{ flex: 1, marginTop: 0 }}>
                                    Verify
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={onCancel || cancelAuth}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-light)',
                                    border: 'none',
                                    padding: '.5rem',
                                    cursor: 'pointer',
                                    marginTop: '1rem',
                                    fontSize: '0.9rem',
                                    width: '100%',
                                    textDecoration: 'underline'
                                }}
                            >
                                {onCancel ? 'Cancel' : 'Back to Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}