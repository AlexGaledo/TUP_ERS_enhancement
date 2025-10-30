import { useState } from "react";
import "../css/HomeAnnouncement.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import HomeNavigation from "../components/HomeNavigation";

import tupUSGLogo from "../assets/tup_usg_logo.png";

import announcement1 from "../assets/announcement1.jpg";
import announcement2 from "../assets/announcement2.jpg";
import announcement3 from "../assets/announcement3.jpg";

export default function HomeAnnouncement() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % announcementImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + announcementImages.length) % announcementImages.length);
    };

    const announcementImages = [announcement1, announcement2, announcement3];
    const announcementCaptions = [
        "TUP US conducts a survey on TUP students regarding the rise of flu-like cases.",
        "Revised Storage Quotas: Students exceeding the new quotas for Google Drive and One Drive (0 GB) must migrate their data to personal storage solutions before October 22, 2025",
        "TUP Manila Resumes Face-To-Face Classes Starting October 15, Wednesday",
    ]
    const imageGradients = [
        'linear-gradient(135deg, #8B3A3A, #C76865)', 
        'linear-gradient(135deg, #8B3A3A, #C76865)', 
        'linear-gradient(135deg, #8B3A3A, #C76865)'  
    ];

    return (
        <div className="home-announcement-page-container">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarVisible={isSidebarVisible} />
            <HomeNavigation />

            <div className="home-announcement-page-content">
                <ul className="home-announcement-page-content-list">
                    <li>
                        <img src={tupUSGLogo} alt="TUP USG"/>
                        <div>
                            <h1>TUPM University of Student Government</h1>
                            <p>{announcementCaptions[0]}</p>
                        </div>
                    </li>
                    <li>
                        <img src={tupUSGLogo} alt="TUP USG"/>
                        <div>
                            <h1>TUPM University of Student Government</h1>
                            <p>{announcementCaptions[0]}</p>
                        </div>
                    </li>
                    <li>
                        <img src={tupUSGLogo} alt="TUP USG"/>
                        <div>
                            <h1>TUPM University of Student Government</h1>
                            <p>{announcementCaptions[0]}</p>
                        </div>
                    </li>
                    <li>
                        <img src={tupUSGLogo} alt="TUP USG"/>
                        <div>
                            <h1>TUPM University of Student Government</h1>
                            <p>{announcementCaptions[0]}</p>
                        </div>
                    </li>
                    <li>
                        <img src={tupUSGLogo} alt="TUP USG"/>
                        <div>
                            <h1>TUPM University of Student Government</h1>
                            <p>{announcementCaptions[0]}</p>
                        </div>
                    </li>
                    <li>
                        <img src={tupUSGLogo} alt="TUP USG"/>
                        <div>
                            <h1>TUPM University of Student Government</h1>
                            <p>{announcementCaptions[0]}</p>
                        </div>
                    </li>
                </ul>

                <div className="home-announcement-page-content-details"> 
                    <div className="home-widget-announcement-author-container">
                        <img src={tupUSGLogo} alt="TUP USG" />
                        <div className="home-widget-announcement-author-text">
                            <h1>TUPM University of Student Government</h1>
                            <h2>{currentSlide+1}h</h2>
                        </div>
                    </div>
                    <p id="home-widget-announcement-caption">ANNOUNCEMENT: {announcementCaptions[currentSlide]}</p>
                    <div className="home-announcement-page-carousel-container">
                        <div 
                            className="home-announcement-page-carousel-slide"
                            style={{ background: imageGradients[currentSlide] }}
                        >
                            <img src={announcementImages[currentSlide]} alt={`Announcement ${currentSlide + 1}`} />
                        </div>
                        
                        <button className="home-announcement-page-carousel-button carousel-prev" onClick={prevSlide} aria-label="Previous">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <button className="home-announcement-page-carousel-button carousel-next" onClick={nextSlide} aria-label="Next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}