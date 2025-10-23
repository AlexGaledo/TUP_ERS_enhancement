import { useState, useEffect } from "react";
import "../css/Home.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import studentImage from "../assets/studentImage.png";
import tupUSGLogo from "../assets/tup_usg_logo.png";

import announcementIcon from "../assets/announcementIcon.svg";
import scheduleIcon from "../assets/scheduleIcon.svg";
import gradesIcon from "../assets/gradesIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import curriculumIcon from "../assets/curriculumIcon.svg";

import announcement1 from "../assets/announcement1.jpg";
import announcement2 from "../assets/announcement2.jpg";
import announcement3 from "../assets/announcement3.jpg";

export default function Home() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    // Initialize from localStorage lazily to avoid wiping on first render
    const [goals, setGoals] = useState(() => {
        try {
            const raw = localStorage.getItem('semesterGoals');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }); 
    const [newGoal, setNewGoal] = useState("");

    // Save goals to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('semesterGoals', JSON.stringify(goals));
        } catch {}
    }, [goals]);

    const announcementImages = [announcement1, announcement2, announcement3];
    
    // Gradient backgrounds based on dominant colors of each image
    const imageGradients = [
        'linear-gradient(135deg, #8B3A3A, #C76865)', // announcement1 - darker red tones
        'linear-gradient(135deg, #8B3A3A, #C76865)', // announcement2 - darker red tones
        'linear-gradient(135deg, #8B3A3A, #C76865)'  // announcement3 - darker red tones
    ];

    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % announcementImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + announcementImages.length) % announcementImages.length);
    };

    // Goals management functions
    const addGoal = () => {
        if (newGoal.trim() && goals.length < 5) {
            setGoals([...goals, { id: Date.now(), text: newGoal.trim() }]);
            setNewGoal("");
        }
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addGoal();
        }
    };

    const currentDate = new Date();

    // "23 October, 2025"
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Individual elements
    const day = currentDate.getDate(); // 23
    const month = currentDate.toLocaleDateString('en-GB', { month: 'long' }); // "October"
    const year = currentDate.getFullYear(); // 2025
    const dayOfWeek = currentDate.toLocaleDateString('en-GB', { weekday: 'long' }); // "Thursday"

    return (
        <div className="home-container">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarVisible={isSidebarVisible} />
            
            <div className="home-welcome-container">
                <div className="home-welcome-text">
                    <p id="home-welcome-date">{formattedDate}</p>
                    <h1 id="home-welcome-greeting">Welcome back, Ford!</h1>
                    <p id="home-welcome-message">Always stay updated in your student portal.</p>
                </div>

                <div className="home-welcome-image">
                    <img src={studentImage} alt="Welcome" />
                </div>
            </div>

            <div className="home-navigation-tabs">
                <div className="home-tab-container">
                    <img src={announcementIcon} alt="Announcement" />
                    <p>Announcement</p>
                </div>

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

            <div className="home-widgets">
                <div className="home-widget-container"> 
                    <div className="home-widget-announcement-author-container">
                        <img src={tupUSGLogo} alt="TUP USG" />
                        <div className="home-widget-announcement-author-text">
                            <h1>TUPM University of Student Government</h1>
                            <h2>1h</h2>
                        </div>
                    </div>
                    <p id="home-widget-announcement-caption">ANNOUNCEMENT: TUP Manila Shifts to Remote Synchronous Learning (RSL)</p>
                    <div className="home-widget-announcement-carousel-container">
                        <div 
                            className="carousel-slide"
                            style={{ background: imageGradients[currentSlide] }}
                        >
                            <img src={announcementImages[currentSlide]} alt={`Announcement ${currentSlide + 1}`} />
                        </div>
                        
                        <button className="carousel-button carousel-prev" onClick={prevSlide} aria-label="Previous">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <button className="carousel-button carousel-next" onClick={nextSlide} aria-label="Next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="home-widget-container schedule-today">
                    <h1>Today's Schedule</h1>
                    <h2>{dayOfWeek}, {month} {day}</h2>
                    <div className="schedule-today-table-container">
                        <table className="schedule-today-table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Modality</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Web Development</td>
                                    <td>9:00am - 12:00pm</td>
                                    <td>322</td>
                                    <td>F2F</td>
                                </tr>
                                <tr>
                                    <td>Parallel and Distributed Computing</td>
                                    <td>1:00pm - 3:00pm</td>
                                    <td>324</td>
                                    <td>F2F</td>
                                </tr>
                                <tr>
                                    <td>Information Assurance and Security</td>
                                    <td>5:00pm - 8:00pm</td>
                                    <td>326</td>
                                    <td>F2F</td>
                                </tr>
                            </tbody>
                        </table>   
                    </div>
                 
                </div>

                <div className="home-widget-container goals">
                        <div className="goals-header">
                            <h1>Goals for this semester</h1>
                            <h2>First Semester</h2>
                        </div>

                    <div className="home-widget-goals-list-container">
                            <div className="goals-list">
                                {goals.map((goal) => (
                                    <div key={goal.id} className="goal-item">
                                        <span>{goal.text}</span>
                                        <button 
                                            className="goal-delete-btn" 
                                            onClick={() => deleteGoal(goal.id)}
                                            aria-label="Delete goal"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {goals.length < 5 && (
                                <div className="goal-input-container">
                                    <input
                                        type="text"
                                        value={newGoal}
                                        onChange={(e) => setNewGoal(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Enter a new goal..."
                                        maxLength={100}
                                        className="goal-input"
                                    />
                                    <button 
                                        className="goal-add-btn" 
                                        onClick={addGoal}
                                        disabled={!newGoal.trim()}
                                        aria-label="Add goal"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        
                            {goals.length >= 5 && (
                                <p className="goal-limit-message">Maximum of 5 goals reached</p>
                            )}
                    </div>
                </div>
            </div>

        </div>
    )
}