import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState } from 'react';

const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarVisible(prev => !prev);
  };

  return (
    <div className="app-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarVisible={isSidebarVisible} />
      <div className="main-content">
        <div className="page-body">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default MainLayout;