import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          Email Address
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>
            Password
          </label>
          <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--primary-text)' }}>
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
        style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
      >
        <span>Sign In to ControlHub</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
