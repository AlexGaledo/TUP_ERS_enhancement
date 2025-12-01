import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './css/auth.css';
import Auth from './pages/auth/auth.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import ResetPage from './pages/auth/forgetpass.jsx';
import ChangePass from './pages/auth/changepass.jsx';
import Otp from './pages/auth/otp.jsx';
import Error404 from './pages/error/error404.jsx';

import MainLayout from './layouts/MainLayout.jsx';
import HomeLayout from './layouts/HomeLayout.jsx';

import Welcome from './pages/home/Welcome.jsx';
import Announcement from './pages/home/Announcement.jsx';
import Schedule from './pages/home/Schedule.jsx';
import Grades from './pages/home/Grades.jsx';
import Calendar from './pages/home/Calendar.jsx';
import Curriculum from './pages/home/Curriculum.jsx';

import Message from './pages/message/Message.jsx';

import Enrollment from './pages/enrollment/enrollment.jsx';
import Assessment from './pages/enrollment/enrollmentAssessment.jsx';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Auth />} />
      </Route>
      <Route path="/forget-password" element={<ResetPage />} />

      {/* Center ChangePass and OTP inside AuthLayout while keeping absolute paths */}
      <Route element={<AuthLayout />}>
        <Route path="/reset-password" element={<ChangePass />} />
        <Route path="/otp" element={<Otp />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="home" replace />}/>
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Navigate to="welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="grades" element={<Grades />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="curriculum" element={<Curriculum />} />
        </Route>

        <Route path="message" element={<Message />} />

        <Route path="enrollment" element={<Enrollment />}>
          <Route path="assessment" element={<Assessment />} />  
        </Route>
        
      </Route>
      {/* Fallback for any unknown route outside /home */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App
