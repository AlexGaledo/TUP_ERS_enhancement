import { useState } from "react";
import "../css/HomeAnnouncement.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import HomeNavigation from "../components/HomeNavigation";

export default function HomeAnnouncement() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    return (
        <div className="home-announcement-page-container">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarVisible={isSidebarVisible} />
            <HomeNavigation />
        </div>
    )
}