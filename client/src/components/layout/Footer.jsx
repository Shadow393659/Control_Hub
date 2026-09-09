import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div style={{ maxWidth: '380px' }}>
            <div className="brand-logo" style={{ marginBottom: '0.65rem' }}>
              <div className="brand-icon">
                <Cpu size={16} strokeWidth={2.2} />
              </div>
              <span>ControlHub</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.55 }}>
              Enterprise IoT infrastructure and smart appliance telemetry console. Connect, automate, and orchestrate appliances across global facilities.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Console
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Home Overview</Link></li>
                <li><Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Live Control Panel</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Access
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sign In</Link></li>
                <li><Link to="/register" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Register Facility</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Status
              </h4>
              <div className="badge badge-active">
                <ShieldCheck size={13} strokeWidth={2.2} />
                <span>Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {currentYear} ControlHub Inc. All rights reserved.</span>
          <span>Engineered for high-efficiency enterprise environments</span>
        </div>
      </div>
    </footer>
  );
}
