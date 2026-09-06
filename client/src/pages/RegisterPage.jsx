import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { Cpu } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // Placeholder registration action: in future connects with /api/users/register
    console.log('User registration:', data);
    navigate('/login');
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
          <h1>Create an Account</h1>
          <p>Get started with smart appliance automation</p>
        </div>

        <RegisterForm onSubmit={handleRegister} />

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-text)', fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
