import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessageModal } from '../../context/MessageModal'

export default function Otp({ onCancel }) {
    const [otp, setOtp] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [timer, setTimer] = useState(0)
    const intervalRef = useRef(null)
    const navigate = useNavigate()
    const { showMessage } = useMessageModal() || { showMessage: () => {} }

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
            const res = await fetch(`${import.meta.env.VITE_API_SECOND_URL}/send-otp`, {
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
            const res = await fetch(`${import.meta.env.VITE_API_SECOND_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
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

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-card" style={{ position: 'relative' }}>
                <h2>OTP Verification</h2>
                <form
                    className="auth-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        verifyOtp()
                    }}
                >
                    <div className="form-group" style={{ marginBottom: '.25rem' }}>
                        <input
                            type="text"
                            className="otp-textspace"
                            placeholder="Enter 6-DIGIT OTP"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                        />
                    </div>
                    <div className="modal-actions" style={{ justifyContent: 'space-between' }}>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onCancel}
                            style={{ marginRight: 'auto' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={getOtp}
                            disabled={disabled}
                            style={{ opacity: disabled ? 0.55 : 1, marginRight: '.5rem' }}
                        >
                            {disabled ? `Resend in ${timer}s` : 'Send Code'}
                        </button>
                        <button type="submit" className="auth-btn">Verify OTP</button>
                    </div>
                </form>
            </div>
        </div>
    )
}