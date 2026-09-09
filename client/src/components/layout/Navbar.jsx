import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cpu, Search, Bell, Plus, ChevronRight, Check, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBreadcrumb, setActiveBreadcrumb] = useState('Overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // Handle Ctrl+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for active room updates from Dashboard
  useEffect(() => {
    const handleRoomChange = (e) => {
      if (e.detail?.room) {
        setActiveBreadcrumb(e.detail.room === 'all' ? 'All Devices' : e.detail.room);
      }
    };
    window.addEventListener('controlhub-room-changed', handleRoomChange);
    return () => window.removeEventListener('controlhub-room-changed', handleRoomChange);
  }, []);

  // Dispatch search query to dashboard
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    window.dispatchEvent(new CustomEvent('controlhub-search', { detail: { query } }));
    if (location.pathname !== '/dashboard' && query.trim()) {
      navigate('/dashboard');
    }
  };

  const handleAddDeviceClick = () => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('controlhub-open-add-device'));
      }, 100);
    } else {
      window.dispatchEvent(new CustomEvent('controlhub-open-add-device'));
    }
  };

  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo & Dynamic Room Breadcrumb */}
        <div className="brand-group">
          <Link to="/" className="brand-logo" title="ControlHub Home">
            <div className="brand-icon">
              <Cpu size={18} strokeWidth={2.2} />
            </div>
            <span>ControlHub</span>
          </Link>

          {/* Navigation Links: Home, Dashboard, Sign In, Register */}
          <nav className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Register
            </Link>
          </nav>

          {isDashboard && (
            <div className="nav-breadcrumb">
              <span className="nav-breadcrumb-sep">/</span>
              <span className="nav-breadcrumb-current">{activeBreadcrumb}</span>
            </div>
          )}
        </div>

        {/* Central Search Bar Placeholder with Ctrl + K */}
        <div className="nav-search-bar">
          <Search size={15} className="nav-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search appliances, rooms..."
            className="nav-search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <kbd className="kbd-shortcut">Ctrl K</kbd>
        </div>

        {/* Right-aligned Status Bar */}
        <div className="nav-actions">
          {/* "System Connected" Green Pulse Indicator */}
          <div className="system-status-indicator" title="Gateway synchronized & telemetry active">
            <span className="status-pulse-dot" />
            <span>System Connected</span>
          </div>

          {/* Notification Bell Icon */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="nav-icon-btn"
              title="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={16} />
              <span className="nav-notification-badge" />
            </button>

            {showNotifications && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  width: '280px',
                  zIndex: 60,
                  boxShadow: 'var(--shadow-md)',
                  padding: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Notifications</span>
                  <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>Live</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ padding: '0.4rem', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: '4px' }}>
                    <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>Telemetry Gateway</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>All 6 appliances are reporting normal voltage.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* "+ Add Device" Primary Button */}
          <button
            type="button"
            onClick={handleAddDeviceClick}
            className="btn btn-primary btn-sm"
            title="Register a new smart device"
          >
            <Plus size={15} strokeWidth={2.2} />
            <span>+ Add Device</span>
          </button>

          {/* User Avatar Trigger */}
          <button
            type="button"
            className="user-avatar-btn"
            title="Account Profile"
            onClick={() => navigate('/login')}
          >
            JD
          </button>
        </div>
      </div>
    </header>
  );
}
