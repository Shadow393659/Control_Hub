import React, { useState } from 'react';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Login submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Work Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="admin@enterprise.com"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>
            Password
          </label>
          <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '0.75rem', padding: '0.65rem' }}
      >
        <span>Sign In to Console</span>
        <ArrowRight size={15} strokeWidth={2.2} />
      </button>
    </form>
  );
}
