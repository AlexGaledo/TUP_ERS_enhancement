import { useState } from "react";
import "../css/HomeAnnouncement.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import HomeNavigation from "../components/HomeNavigation";

import tupUSGLogo from "../assets/tup_usg_logo.png";

import announcement1 from "../assets/announcement1.jpg";
import announcement2 from "../assets/announcement2.jpg";
import announcement3 from "../assets/announcement3.jpg";
import announcement4 from "../assets/announcement4.jpg";
import announcement5 from "../assets/announcement5.jpg";
import announcement6 from "../assets/announcement6.jpg";
import announcement7 from "../assets/announcement7.jpg";
import announcement8 from "../assets/announcement8.jpg";
import announcement9 from "../assets/announcement9.jpg";
import announcement10 from "../assets/announcement10.jpg";

export default function HomeAnnouncement() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % announcements.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
    };

    const announcements = [
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "TUP US conducts a survey on TUP students regarding the rise of flu-like cases.",
            image: announcement1,
            time: "2h"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "Revised Storage Quotas: Students exceeding the new quotas for Google Drive and One Drive (0 GB) must migrate their data to personal storage solutions before October 22, 2025",
            image: announcement2,
            time: "4h"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "ANNOUNCEMENT: ID Validation is now open for 2nd Year students and above.",
            image: announcement3,
            time: "1d"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "ANNOUNCEMENT: Face-to-Face classes will resume starting October 15, Wednesday.",
            image: announcement4,
            time: "1w"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "ALERT: NSTP Seminar happening at TUP Covered Court, September 28, 2025. Please refrain from entering the venue without permission.",
            image: announcement5,
            time: "1mo"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "ANNOUNCEMENT: Due to the increasing cases of Flu and Flu-like illnesses, all classes will shift to Remote Asynchronous Learning (RAL) on October 13-14, 2025.",
            image: announcement6,
            time: "2mo"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "ANNOUNCEMENT: The University President approves the request to shift to Remote Asynchronous Learning (RAL) on February 25, 2025, EDSA Day. Attached is the official signed memorandum of the University President.",
            image: announcement7,
            time: "6mo"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "WALANG PASOK: Classes are suspended on September 1, 2025 due to intense heavy rainfall. ",
            image: announcement8,
            time: "1mo"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "WALANG PASOK: Classes are suspended on August 25, 2025 due to intense heavy rainfall.",
            image: announcement9,
            time: "2mo"
        },
        {
            authorLogo: tupUSGLogo,
            authorName: "TUPM University of Student Government",
            caption: "ANNOUNCEMENT: Free Mandatory Chest Xray will be temporarily suspended on June 13-28. Please be guided accordingly.",
            image: announcement10,
            time: "5mo"
        }
    ]

    return (
        <div className="home-announcement-page-container">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarVisible={isSidebarVisible} />
            <HomeNavigation />

            <div className="home-announcement-page-content">
                <ul className="home-announcement-page-content-list">
                    { announcements.map((announcement, i) => (
                        <li key={i}>
                            <img src={announcement.authorLogo} alt="TUP USG"/>
                            <div>
                                <h1>{announcement.authorName}</h1>
                                <p>{announcement.caption}</p>
                            </div>
                        </li>
                    )) }
                </ul>

                <div className="home-announcement-page-content-details"> 
                    <div className="home-widget-announcement-author-container">
                        <img src={tupUSGLogo} alt="TUP USG" />
                        <div className="home-widget-announcement-author-text">
                            <h1>TUPM University of Student Government</h1>
                            <h2>{announcements[currentSlide].time}</h2>
                        </div>
                    </div>
                    <p id="home-widget-announcement-caption">{announcements[currentSlide].caption}</p>
                    <div className="home-announcement-page-carousel-container">
                        <div 
                            className="home-announcement-page-carousel-slide"
                        >
                            <img src={announcements[currentSlide].image} alt={`Announcement ${currentSlide + 1}`} />
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

                <div className="home-announcement-page-content-feed">
                    {announcements.map((announcement, i) => (
                        <div className="home-announcement-page-content-feed-details" key={i}>
                            <div className="home-widget-announcement-author-container">
                                <img src={announcement.authorLogo} alt="TUP USG" />
                                <div className="home-widget-announcement-author-text">
                                    <h1>{announcement.authorName}</h1>
                                    <h2>{announcement.time}</h2>
                                </div>
                            </div>
                            <p id="home-widget-announcement-caption">{announcement.caption}</p>
                            <div className="home-announcement-page-carousel-container">
                                <div 
                                    className="home-announcement-page-carousel-slide"
                                >
                                    <img src={announcement.image} alt={`Announcement ${i + 1}`} />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}