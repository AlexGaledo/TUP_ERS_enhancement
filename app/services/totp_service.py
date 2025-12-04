"""
TOTP (Time-based One-Time Password) Service
Handles Google Authenticator functionality including:
- Secret generation
- QR code generation
- TOTP verification
"""
import pyotp
import qrcode
import io
import base64
from typing import Tuple


class TOTPService:
    """Service for managing TOTP/Google Authenticator functionality"""
    
    @staticmethod
    def generate_secret() -> str:
        """
        Generate a new random TOTP secret
        Returns:
            str: Base32 encoded secret key
        """
        return pyotp.random_base32()
    
    @staticmethod
    def get_provisioning_uri(secret: str, email: str, issuer_name: str = "TUP ERS") -> str:
        """
        Generate provisioning URI for QR code
        Args:
            secret: The TOTP secret key
            email: User's email address
            issuer_name: Name of the service
        Returns:
            str: Provisioning URI
        """
        totp = pyotp.TOTP(secret)
        return totp.provisioning_uri(name=email, issuer_name=issuer_name)
    
    @staticmethod
    def generate_qr_code(provisioning_uri: str) -> str:
        """
        Generate QR code image from provisioning URI
        Args:
            provisioning_uri: The URI to encode in QR code
        Returns:
            str: Base64 encoded PNG image
        """
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L, # type: ignore
            box_size=10,
            border=4,
        )
        qr.add_data(provisioning_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Convert to base64
        buffer = io.BytesIO()
        img.save(buffer, format='PNG') # type: ignore
        buffer.seek(0)
        img_base64 = base64.b64encode(buffer.getvalue()).decode()
        
        return f"data:image/png;base64,{img_base64}"
    
    @staticmethod
    def verify_totp(secret: str, token: str) -> bool:
        """
        Verify a TOTP token
        Args:
            secret: The user's TOTP secret
            token: The 6-digit code from authenticator app
        Returns:
            bool: True if token is valid, False otherwise
        """
        if not secret or not token:
            return False
        
        try:
            totp = pyotp.TOTP(secret)
            # Verify with a window of ±1 time step (30 seconds each) to account for time drift
            return totp.verify(token, valid_window=1)
        except Exception:
            return False
    
    @staticmethod
    def get_setup_data(secret: str, email: str) -> Tuple[str, str]:
        """
        Get both QR code and manual entry key for setup
        Args:
            secret: The TOTP secret
            email: User's email
        Returns:
            Tuple[str, str]: (qr_code_data_uri, secret_for_manual_entry)
        """
        provisioning_uri = TOTPService.get_provisioning_uri(secret, email)
        qr_code = TOTPService.generate_qr_code(provisioning_uri)
        return qr_code, secret
