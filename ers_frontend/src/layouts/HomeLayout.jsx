import { Outlet, useLocation } from 'react-router-dom';
import HomeNavigation from '../components/HomeNavigation';

const HomeLayout = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/home' || location.pathname === '/home/welcome';

  return (
    <div className="home-container">
      {/* conditional rendering for HomeNavigation, do not render HomeNavigation here if the Outlet is Welcome.jsx */}
      {!isWelcomePage && <HomeNavigation />}
      <div className="home-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default HomeLayout;