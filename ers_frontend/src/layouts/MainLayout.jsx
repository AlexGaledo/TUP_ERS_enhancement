import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState, useEffect, useRef } from 'react';

const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
      setIsSidebarVisible(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('#toggle-sidebar')
      ) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarVisible]);

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar ref={sidebarRef} isSidebarVisible={isSidebarVisible} />
      <div className="main-content">
        <div className="page-body">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default MainLayout;