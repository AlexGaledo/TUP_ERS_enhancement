import "../css/Sidebar.css";
import { Link } from "react-router-dom";
import homeIcon from "../assets/homeIcon.svg";
import messageIcon from "../assets/messageIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import enrollmentIcon from "../assets/enrollmentIcon.svg";
import graduationIcon from "../assets/graduationIcon.svg";
import evaluationIcon from "../assets/evaluationIcon.svg";
import { forwardRef } from "react";
import { useUser } from "../context/UserContext";

const Sidebar = forwardRef(({ isSidebarVisible }, ref) => {
    const { logout } = useUser() || { logout: () => {} };
    return (
        <div ref={ref} className={`sidebar-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
            <Link to="/home" className="sidebar-link">
                <img src={homeIcon} alt="Home" />
                <p>Home</p>
            </Link>

            <Link to="/message" className="sidebar-link">
                <img src={messageIcon} alt="Message" />
                <p>Message</p>
            </Link>

            <Link to="/profile" className="sidebar-link">
                <img src={profileIcon} alt="Profile" />
                <p>Profile</p>
            </Link>

            <Link to="/enrollment" className="sidebar-link">
                <img src={enrollmentIcon} alt="Enrollment" />
                <p>Enrollment</p>
            </Link>

            <Link to="/graduation-application" className="sidebar-link">
                <img src={graduationIcon} alt="Graduation" />
                <p>Application for Graduation</p>
            </Link>

            <Link to="/faculty-evaluation" className="sidebar-link">
                <img src={evaluationIcon} alt="Evaluation" />
                <p>Faculty Evaluation</p>
            </Link>

            <button onClick={logout} className="sidebar-link logout-btn" style={{ border: 'none', background: 'transparent', width: '100%', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <p>Logout</p>
            </button>
        </div>
    )
});

export default Sidebar;