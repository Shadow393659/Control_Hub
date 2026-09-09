import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`app-container ${isDashboard ? 'dashboard-mode' : ''}`}>
      {/* Persistent Navigation Header (Hidden on visionOS Smart Hub for full immersion) */}
      {!isDashboard && <Navbar />}

      {/* Main Multi-Page Routed View */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      {!isDashboard && <Footer />}
    </div>
  );
}
