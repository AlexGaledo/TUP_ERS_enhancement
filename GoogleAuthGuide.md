# Google Authenticator (TOTP) Implementation Guide

## Overview

This implementation adds Google Authenticator (Time-based One-Time Password) support to the TUP ERS application for enhanced account security.

## Features Implemented

### Backend (Flask)

1. **New Database Fields** (`app/database/models.py`)

   - `totp_secret`: Stores the user's TOTP secret key
   - `totp_enabled`: Boolean flag to indicate if TOTP is active

2. **TOTP Service** (`app/services/totp_service.py`)

   - Generate TOTP secrets
   - Create QR codes for easy setup
   - Verify TOTP codes with time drift tolerance
w
3. **API Routes** (`app/routes/auth_routes.py`)
   - `POST /auth/totp/setup` - Generate QR code and secret (requires JWT)
   - `POST /auth/totp/enable` - Verify and enable TOTP (requires JWT)
   - `POST /auth/totp/disable` - Disable TOTP (requires JWT + password + TOTP code)
   - `GET /auth/totp/status` - Check if TOTP is enabled (requires JWT)
   - `POST /auth/totp/verify` - Verify TOTP during password reset
   - `POST /auth/forgot-password` - Updated to require TOTP if enabled

### Frontend (React)

1. **GoogleAuthenticator Component** (`src/components/GoogleAuthenticator.jsx`)

   - Enable/disable authenticator
   - Display QR code for setup
   - Manual entry code option
   - Verify codes

2. **Updated Forgot Password** (`src/pages/auth/forgetpass.jsx`)
   - TOTP input field when required
   - Automatic detection of TOTP-enabled accounts

## Setup Instructions

### Backend Setup

1. **Install Required Packages**

   ```bash
   cd TUP_ERS_enhancement
   pip install -r requirements.txt
   ```

2. **Create Database Migration**

   ```bash
   flask db migrate -m "Add TOTP fields to User model"
   flask db upgrade
   ```

3. **Run the Backend**
   ```bash
   flask run
   ```

### Frontend Setup

1. **No additional packages needed** (uses existing axios)

2. **Add GoogleAuthenticator to Profile Page**

   In `src/pages/profile/profile.jsx`, import and add the component:

   ```jsx
   import GoogleAuthenticator from "../../components/GoogleAuthenticator";

   // Inside your Profile component, add this section (e.g., near Change Password):
   <GoogleAuthenticator userId={user?.id} />;
   ```

## Usage Flow

### Enabling Google Authenticator

1. **User clicks "Enable Authenticator"** in their profile
2. **System generates** a TOTP secret and QR code
3. **User scans QR code** with Google Authenticator app (or enters manually)
4. **User enters 6-digit code** from app to verify setup
5. **System enables TOTP** for the account

### Using TOTP During Password Reset

1. **User requests password reset** via forgot password page
2. **If TOTP is enabled**, system prompts for authenticator code
3. **User enters code** from their authenticator app
4. **System verifies TOTP** before sending reset email
5. **Reset link sent** to user's email

### Disabling Google Authenticator

1. **User clicks to disable** in profile
2. **User enters password** for confirmation
3. **User enters current TOTP code** for verification
4. **System disables TOTP** and removes secret

## Security Features

- **Time drift tolerance**: Accepts codes within ±30 seconds
- **Secret encryption**: Secrets stored securely in database
- **Password verification**: Required when disabling TOTP
- **JWT authentication**: All TOTP endpoints require valid JWT token
- **Forgot password protection**: TOTP required if enabled

## API Endpoints Reference

| Endpoint                | Method | Auth | Description                         |
| ----------------------- | ------ | ---- | ----------------------------------- |
| `/auth/totp/setup`      | POST   | JWT  | Generate QR code                    |
| `/auth/totp/enable`     | POST   | JWT  | Enable TOTP                         |
| `/auth/totp/disable`    | POST   | JWT  | Disable TOTP                        |
| `/auth/totp/status`     | GET    | JWT  | Check TOTP status                   |
| `/auth/totp/verify`     | POST   | None | Verify TOTP (password reset)        |
| `/auth/forgot-password` | POST   | None | Request password reset (TOTP aware) |

## Testing

### Test Enable Flow

1. Login to the application
2. Navigate to Profile page
3. Click "Enable Authenticator"
4. Scan QR code with Google Authenticator
5. Enter the 6-digit code
6. Verify it says "enabled successfully"

### Test Password Reset Flow

1. Enable TOTP on an account
2. Logout
3. Go to "Forgot Password"
4. Enter email
5. Verify it prompts for TOTP code
6. Enter code from authenticator
7. Check email for reset link

### Test Disable Flow

1. In Profile, scroll to authenticator section
2. Enter your password
3. Enter current TOTP code
4. Click "Disable Authenticator"
5. Verify TOTP is disabled

## Troubleshooting

**QR Code not showing?**

- Check backend logs for errors
- Verify `pyotp` and `qrcode[pil]` are installed

**TOTP code always invalid?**

- Check server time is synchronized
- Verify phone/computer time is correct
- Time drift can cause invalid codes

**Cannot disable TOTP?**

- Ensure password is correct
- Verify TOTP code is current (codes expire every 30 seconds)

## Dependencies Added

**Python (requirements.txt):**

- `pyotp` - TOTP generation and verification
- `qrcode[pil]` - QR code generation with PIL support

**React:**

- No new dependencies (uses existing axios)

## File Structure

```
Backend:
├── app/
│   ├── database/
│   │   └── models.py (updated)
│   ├── routes/
│   │   └── auth_routes.py (updated)
│   └── services/
│       └── totp_service.py (new)
└── requirements.txt (updated)

Frontend:
├── src/
│   ├── components/
│   │   ├── GoogleAuthenticator.jsx (new)
│   │   └── TotpInput.jsx (new)
│   ├── css/
│   │   └── auth/
│   │       ├── GoogleAuthenticator.css (new)
│   │       └── TotpInput.css (new)
│   └── pages/
│       └── auth/
│           └── forgetpass.jsx (updated)
```

## Next Steps

1. Run database migration
2. Add GoogleAuthenticator component to Profile page
3. Test the complete flow
4. Update production environment variables if needed
5. Consider adding TOTP to login flow (optional enhancement)

## Future Enhancements

- Add TOTP to login flow (not just password reset)
- Backup codes for account recovery
- Email notification when TOTP is enabled/disabled
- TOTP setup during registration
- Admin panel to view TOTP status of users
