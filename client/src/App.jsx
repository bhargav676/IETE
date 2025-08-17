import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from './tokenService';

import UserDashboardPage from './userdashboard/pages/UserDashboardPage';
import AllEvents from './userdashboard/pages/AllEvents';
import LoginPage from './admin/pages/LoginPage';
import AdminDashboardLayout from './admin/pages/AdminDashboardLayout';
import PastEventPage from './admin/pages/PastEventPage';
import UpcomingEventPage from './admin/pages/UpcomingEventPage';
import GoverningTeamPage from './admin/pages/GoverningTeamPage';
import ElectromazinePage from './admin/pages/ElectromazinePage';
import EditPastEventPage from './admin/pages/EditPastEventPage';
import EditUpcomingEventPage from './admin/pages/EditUpcomingEventPage';
import EditGoverningTeamPage from './admin/pages/EditGoverningTeamMemberPage';
import EditElectromazinePage from './admin/pages/EditElectromazinePage';
import OurEvents from './userdashboard/pages/OurEvents';
import WithNavbar from './userdashboard/pages/WithNavbar'
import About from './userdashboard/pages/About';
import Ourteam from './userdashboard/pages/Ourteam'
import OurTeamJourney from './admin/pages/OurTeamJourneyUpload';
import EditOurTeamJourney from './admin/pages/EditOurTeamJourney';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) setIsAuthenticated(true);
        setLoading(false);
    }, []);

    const login = (token) => {
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
        window.location.href = '/admin/login';
    };

    const PrivateRoute = ({ children }) => {
        if (loading) return null;
        return isAuthenticated ? children : <Navigate to="/admin/login" />;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                <p className="ml-4 text-gray-700">Loading application...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            <Router>
  <Routes>
    {/* Public */}
    <Route path="/" element={<UserDashboardPage />} />
    <Route path="/all-events" element={<AllEvents />} />

    {/* Only this branch gets the navbar */}
    <Route element={<WithNavbar />}>
      <Route path="/ourevents" element={<OurEvents />} />
      <Route path="/about" element={<About />} />
      <Route path="/ourteam" element={<Ourteam />} />
      
    </Route>

    {/* Admin */}
    <Route
      path="/admin/login"
      element={isAuthenticated ? <Navigate to="/admin/past-events" /> : <LoginPage />}
    />
    <Route path="/admin" element={<PrivateRoute><AdminDashboardLayout /></PrivateRoute>}>
      <Route index element={<Navigate to="past-events" replace />} />
      <Route path="past-events" element={<PastEventPage />} />
      <Route path="past-events/manage" element={<EditPastEventPage />} />
      <Route path="upcoming-events" element={<UpcomingEventPage />} />
      <Route path="upcoming-events/manage" element={<EditUpcomingEventPage />} />
      <Route path="governing-team" element={<GoverningTeamPage />} />
      <Route path="governing-team/manage" element={<EditGoverningTeamPage />} />
      <Route path="electromazine" element={<ElectromazinePage />} />
      <Route path="our-team-journey" element={<OurTeamJourney />} />
      <Route path="electromazine/manage" element={<EditElectromazinePage />} />
      <Route path="edit-our-team-journey" element={<EditOurTeamJourney />} />
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</Router>
        </AuthContext.Provider>
    );
}

export default App;
