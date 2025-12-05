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
import Profile from './pages/profile/profile.jsx';
import GraduationApplication from './pages/graduation/GraduationApplication';
import FacultyEvaluation from './pages/facultyEvaluation/FacultyEvaluation';
import ResetPassword from './pages/auth/resetpassword.jsx';
import ChatbotWidget from './components/chatbot/Chatbotwidget.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />}/>
        <Route path="login" element={<Auth />} />
        <Route path="forget-password" element={<ResetPage />} />
        <Route path="reset-password/:token" element={<ResetPassword/>} />
        <Route path="otp" element={<Otp />} />
      </Route>
    
      <Route element={<ProtectedRoute />}>
        <Route path="/change-password" element={<ChangePass />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="home" replace />}/>
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<HomeLayout />}>
            <Route index element={<Navigate to="welcome" replace />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="grades" element={<Grades />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="curriculum" element={<Curriculum />} />
          </Route>
          
          <Route path="graduation-application" element={<GraduationApplication />} />
          <Route path="faculty-evaluation" element={<FacultyEvaluation />} />
          <Route path="message" element={<Message />} />

          <Route path="enrollment" element={<Enrollment />}>
            <Route path="assessment" element={<Assessment />} />  
          </Route>
        </Route>
      </Route>

      {/* Fallback for any unknown route outside /home */}
      <Route path="*" element={<Error404 />} />
    </Routes>
    {/* Global chatbot widget fixed to corner, present on all pages */}
    <ChatbotWidget />
    </>
  );
}

export default App
