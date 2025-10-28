import announcementIcon from "../assets/announcementIcon.svg";
import scheduleIcon from "../assets/scheduleIcon.svg";
import gradesIcon from "../assets/gradesIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import curriculumIcon from "../assets/curriculumIcon.svg";

export default function HomeNavigation() {
    return (
        <div className="home-navigation-tabs">
            <a href="/home/announcement" className="home-tab-container">
                <img src={announcementIcon} alt="Announcement" />
                <p>Announcement</p>
            </a>

            <div className="home-tab-container">
                <img src={scheduleIcon} alt="Schedule" />
                <p>Schedule</p>
            </div>

            <div className="home-tab-container">
                <img src={gradesIcon} alt="Grades" />
                <p>Grades</p>
            </div>

            <div className="home-tab-container">
                <img src={calendarIcon} alt="Calendar" />
                <p>Calendar</p>
            </div>

            <div className="home-tab-container">
                <img src={curriculumIcon} alt="Curriculum" />
                <p>Curriculum</p>
            </div>
        </div>
    )
}