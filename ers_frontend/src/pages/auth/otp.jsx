import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessageModal } from '../../context/MessageModal'
import '../../css/auth.css'
import logo from '../../assets/tup_logo.png'

export default function Otp({ onCancel }) {
    const [otp, setOtp] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [timer, setTimer] = useState(0)
    const intervalRef = useRef(null)
    const navigate = useNavigate()
    const { showMessage } = useMessageModal() || { showMessage: () => {} }
    const OTP_API = import.meta.env.VITE_API_SECOND_URL

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
        if (disabled) return
        if (!OTP_API) {
            showMessage({
                title: 'Service not configured',
                message: 'VITE_API_SECOND_URL is missing. Please configure the OTP service URL.',
                type: 'error',
            })
            return
        }
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
            const res = await fetch(`${OTP_API}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const text = await res.text()
            if (res.ok) {
                showMessage({
                    title: 'OTP sent',
                    message: 'Check your inbox for the verification code.',
                    type: 'success',
                    autoCloseMs: 2500,
                })
            } else {
                showMessage({
                    title: 'Send failed',
                    message: text || 'Unable to send OTP. Please try again.',
                    type: 'error',
                })
            }
        } catch (err) {
            showMessage({
                title: 'Network error',
                message: 'Could not reach the OTP service.',
                type: 'error',
            })
        }
    }

    const verifyOtp = async () => {
        if (!OTP_API) {
            showMessage({
                title: 'Service not configured',
                message: 'VITE_API_SECOND_URL is missing. Please configure the OTP service URL.',
                type: 'error',
            })
            return
        }
        const email = localStorage.getItem('email_for_verification')
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
            const res = await fetch(`${OTP_API}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: String(otp) }),
            })
            const text = await res.text()
            if (res.ok) {
                localStorage.removeItem('email_for_verification')
                showMessage({
                    title: 'Verified',
                    message: 'Your account has been verified successfully.',
                    type: 'success',
                    autoCloseMs: 2000,
                })
                navigate('/home/welcome')
            } else {
                showMessage({
                    title: 'Verification failed',
                    message: text || 'The code you entered is incorrect or expired.',
                    type: 'error',
                })
            }
        } catch (err) {
            showMessage({
                title: 'Network error',
                message: 'Could not verify the OTP right now.',
                type: 'error',
            })
        }
    }

    const containerStyle = onCancel ? {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'var(--bg-color)',
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
                                verifyOtp()
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

                            {onCancel && (
                                <button
                                    type="button"
                                    onClick={onCancel}
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
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}