
import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { CMSProvider } from './CMSContext';
import LandingPage from './views/LandingPage';
import AdminDashboard from './views/AdminDashboard';
import LoginPage from './views/LoginPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = localStorage.getItem('martins_auth') === 'true';
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <CMSProvider>
      <HashRouter>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </HashRouter>
    </CMSProvider>
  );
};

export default App;
