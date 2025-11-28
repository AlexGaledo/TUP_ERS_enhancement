import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './css/auth.css';
import Auth from './pages/auth.jsx';
import ResetPage from './pages/forgetpass.jsx';
import ChangePass from './pages/changepass.jsx';
import Otp from './pages/otp.jsx';

import MainLayout from './layouts/MainLayout.jsx';
import HomeLayout from './layouts/HomeLayout.jsx';

import Welcome from './pages/home/Welcome.jsx';
import Announcement from './pages/home/Announcement.jsx';
import Schedule from './pages/home/Schedule.jsx';
import Grades from './pages/home/Grades.jsx';
import Calendar from './pages/home/Calendar.jsx';
import Curriculum from './pages/home/Curriculum.jsx';

import Message from './pages/message/Message.jsx';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/forget-password" element={<ResetPage />} />
      <Route path="/reset-password/:token" element={<ChangePass />} />
      <Route path="/otp" element={<Otp />} />

      <Route path="/" element={<MainLayout />}>
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
      </Route>
    </Routes>
  );
}

export default App
