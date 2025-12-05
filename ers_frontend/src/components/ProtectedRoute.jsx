import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = () => {
    const { user, isOtpVerified, isLoading } = useUser();

    if (isLoading) {
        return <div className="loading-screen">Loading...</div>;
    }

    if (!user || !isOtpVerified) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
