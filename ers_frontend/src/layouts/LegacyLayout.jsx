import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarVisible={isSidebarVisible} />
            <main>{children}</main>
        </>
    );
};

export default Layout;