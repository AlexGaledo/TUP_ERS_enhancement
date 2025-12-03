import "../css/Header.css";
import tupLogo from "../assets/tup_logo.png";
import hamburgerIcon from "../assets/hamburgerIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import notificationIcon from "../assets/notificationIcon.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Header({ toggleSidebar }) {
  const { logout } = useUser() || { logout: () => {} };
  return (
    <header className="header-container">
      <div className="header-left-section">
        <img
          id="toggle-sidebar"
          src={hamburgerIcon}
          alt="Toggle Sidebar"
          onClick={toggleSidebar}
          style={{ cursor: "pointer" }}
        />
        <img id="header-school-logo" src={tupLogo} alt="TUP Logo" />
        <div className="header-left-text">
          <h1>Technological University of the Philippines</h1>
          <h2>
            Enrollment and Registration System | Academic Information Management
            System
          </h2>
        </div>
      </div>

      <div className="header-right-section">
        <Link to="/profile" className="header-right-profile-group">
          <img src={profileIcon} alt="User Profile" />
          <div className="header-right-profile-group-text">
            <h1>{useUser()?.user?.username || 'User'}</h1>
            <h2>{useUser()?.user?.tup_id || 'N/A'}</h2>
          </div>
        </Link>

        <img src={notificationIcon} alt="Notifications" />
        <img src={logoutIcon} alt="Log Out" onClick={logout} />
      </div>
    </header>
  );
}
