import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { Cpu } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    console.log('User login:', credentials);
    navigate('/dashboard');
  };

  return (
    <div className="page-container">
      <div className="auth-wrapper card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div
              className="brand-icon"
              style={{
                width: 42,
                height: 42,
                borderRadius: 'var(--radius-md)',
              }}
            >
              <Cpu size={22} strokeWidth={2.2} />
            </div>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Sign in to access your ControlHub environment
          </p>
        </div>

        <LoginForm onSubmit={handleLogin} />

        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
}
