import "../css/Sidebar.css";
import { Link } from "react-router-dom";
import homeIcon from "../assets/homeIcon.svg";
import messageIcon from "../assets/messageIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import enrollmentIcon from "../assets/enrollmentIcon.svg";
import graduationIcon from "../assets/graduationIcon.svg";
import evaluationIcon from "../assets/evaluationIcon.svg";
import { forwardRef } from "react";

const Sidebar = forwardRef(({ isSidebarVisible }, ref) => {
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
        </div>
    )
});

export default Sidebar;