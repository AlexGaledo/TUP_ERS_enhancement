import { Outlet } from 'react-router-dom';
import tup_artisan from '../assets/tup_artisan.png';
import '../css/authPages.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  );
}
