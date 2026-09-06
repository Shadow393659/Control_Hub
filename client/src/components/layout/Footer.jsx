import React from 'react';
import { Cpu, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div style={{ maxWidth: '380px' }}>
            <div className="brand-logo" style={{ marginBottom: '0.75rem' }}>
              <div className="brand-icon">
                <Cpu size={18} />
              </div>
              <span>ControlHub</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Enterprise-grade smart home automation and monitoring platform. Connect, automate, and optimize your appliances seamlessly.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Platform</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Overview</Link></li>
                <li><Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Control Panel</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Account</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sign In</Link></li>
                <li><Link to="/register" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Register</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Status</h4>
              <div className="badge badge-success">
                <ShieldCheck size={14} />
                <span>Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {currentYear} ControlHub. All rights reserved.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            Engineered for high-efficiency smart spaces
          </span>
        </div>
      </div>
    </footer>
  );
}
