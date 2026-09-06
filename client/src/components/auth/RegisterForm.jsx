import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      console.log('Register submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label className="form-label" htmlFor="register-name">
          Full Name
        </label>
        <input
          id="register-name"
          name="name"
          type="text"
          required
          placeholder="Jane Doe"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="register-email">
          Email Address
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          required
          placeholder="jane@example.com"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="register-password">
          Password
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          required
          placeholder="At least 8 characters"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="register-confirm">
          Confirm Password
        </label>
        <input
          id="register-confirm"
          name="confirmPassword"
          type="password"
          required
          placeholder="Repeat your password"
          className="form-input"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
      >
        <span>Create Account</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
