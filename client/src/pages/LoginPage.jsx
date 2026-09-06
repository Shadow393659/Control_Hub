import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { Cpu } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    // Placeholder login action: in future this connects with /api/users/login
    console.log('User login:', credentials);
    navigate('/dashboard');
  };

  return (
    <div className="page-container">
      <div className="auth-wrapper card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div className="brand-icon" style={{ width: 40, height: 40 }}>
              <Cpu size={24} />
            </div>
          </div>
          <h1>Welcome back</h1>
          <p>Sign in to your ControlHub dashboard</p>
        </div>

        <LoginForm onSubmit={handleLogin} />

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary-text)', fontWeight: 600 }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
