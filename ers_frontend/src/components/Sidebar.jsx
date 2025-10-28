import "../css/Sidebar.css";
import homeIcon from "../assets/homeIcon.svg";
import messageIcon from "../assets/messageIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import enrollmentIcon from "../assets/enrollmentIcon.svg";
import graduationIcon from "../assets/graduationIcon.svg";
import evaluationIcon from "../assets/evaluationIcon.svg";

export default function Sidebar({ isSidebarVisible }) {
    return (
        <div className={`sidebar-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
            <a href="/home" className="sidebar-link">
                <img src={homeIcon} alt="Home" />
                <p>Home</p>
            </a>

            <a href="/home" className="sidebar-link">
                <img src={messageIcon} alt="Message" />
                <p>Message</p>
            </a>

            <a href="/home" className="sidebar-link">
                <img src={profileIcon} alt="Profile" />
                <p>Profile</p>
            </a>

            <a href="/home" className="sidebar-link">
                <img src={enrollmentIcon} alt="Enrollment" />
                <p>Enrollment</p>
            </a>

            <a href="/home" className="sidebar-link">
                <img src={graduationIcon} alt="Graduation" />
                <p>Application for Graduation</p>
            </a>

            <a href="/home" className="sidebar-link">
                <img src={evaluationIcon} alt="Evaluation" />
                <p>Faculty Evaluation</p>
            </a>
        </div>
    )
}