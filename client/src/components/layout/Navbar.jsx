import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Cpu size={20} />
          </div>
          <span>ControlHub</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Dynamic Auth Actions */}
        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline btn-sm">
            <LogIn size={15} />
            <span>Sign In</span>
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            <UserPlus size={15} />
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
