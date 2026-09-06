import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Smartphone, Sliders, Cpu, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="page-container">
      {/* Hero Section Outline */}
      <section className="hero-section">
        <div className="badge badge-neutral" style={{ marginBottom: '1.25rem' }}>
          <Activity size={14} style={{ color: 'var(--primary-text)' }} />
          <span>Next-Gen Smart Automation</span>
        </div>
        <h1 className="hero-title">
          Intelligent Control for Every <span style={{ color: 'var(--primary-text)' }}>Smart Device</span>
        </h1>
        <p className="hero-subtitle">
          ControlHub provides real-time telemetry, automated energy management, and streamlined multi-room appliance control through an enterprise-grade cloud interface.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary btn-lg">
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            <span>Sign In</span>
          </Link>
          <Link to="/dashboard" className="btn btn-outline btn-lg">
            <span>Live Dashboard</span>
          </Link>
        </div>
      </section>

      {/* Feature Cards Structure */}
      <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Built for Scale, Reliability & Performance
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Everything you need to orchestrate connected smart appliances from a unified console.
          </p>
        </div>

        <div className="grid-3">
          <div className="card card-hover">
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Real-Time Energy Telemetry
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Monitor wattage consumption across individual rooms and prioritize energy savings with instant live feedback.
            </p>
          </div>

          <div className="card card-hover">
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Sliders size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Multi-Room Automation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Group appliances by zone or room and execute batch commands to turn systems on or off in a single click.
            </p>
          </div>

          <div className="card card-hover">
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Shield size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Enterprise Security
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              End-to-end device authorization, secure REST APIs, and instant fallback offline caching for continuous uptime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
