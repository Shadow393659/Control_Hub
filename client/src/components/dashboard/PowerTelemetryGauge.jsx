import React from 'react';
import { Zap, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function PowerTelemetryGauge({
  totalPower = 0,
  maxCapacity = 3500,
  activeCount = 0,
}) {
  // Compute percentage of load
  const loadPercentage = Math.min(Math.round((totalPower / maxCapacity) * 100), 100);
  const formattedKw = (totalPower / 1000).toFixed(2);

  // SVG circular geometry
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (loadPercentage / 100) * circumference;

  // Determine color and status badge based on load
  const getLoadStatus = () => {
    if (loadPercentage > 85) {
      return {
        label: 'Peak Load',
        color: '#DC2626',
        bg: 'rgba(254, 226, 226, 0.95)',
        gradientStart: '#F87171',
        gradientEnd: '#DC2626',
        icon: AlertTriangle,
        desc: 'Power draw near recommended peak zone threshold.',
      };
    }
    if (loadPercentage > 50) {
      return {
        label: 'Moderate Load',
        color: '#D97706',
        bg: 'rgba(254, 243, 199, 0.95)',
        gradientStart: '#FBBF24',
        gradientEnd: '#D97706',
        icon: Activity,
        desc: 'Standard operational energy throughput.',
      };
    }
    return {
      label: 'Eco Efficient',
      color: '#059669',
      bg: 'rgba(209, 250, 229, 0.95)',
      gradientStart: '#34D399',
      gradientEnd: '#059669',
      icon: ShieldCheck,
      desc: 'Optimized energy distribution across active zones.',
    };
  };

  const statusInfo = getLoadStatus();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="glass-card" style={{ padding: '1.5rem 1.25rem' }}>
      {/* Title & Live Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '11px',
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
              color: '#1D4ED8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={18} strokeWidth={2.6} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.975rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.015em' }}>
              Power Telemetry
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>
              Live grid load dial
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: '0.725rem',
            fontWeight: 800,
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            background: statusInfo.bg,
            border: `1px solid ${statusInfo.color}`,
            color: statusInfo.color,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
          }}
        >
          <StatusIcon size={13} strokeWidth={2.6} />
          {statusInfo.label}
        </span>
      </div>

      {/* Circular Dial Gauge */}
      <div className="gauge-container">
        <svg
          className="gauge-svg"
          width="170"
          height="170"
          viewBox="0 0 170 170"
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={statusInfo.gradientStart} />
              <stop offset="100%" stopColor={statusInfo.gradientEnd} />
            </linearGradient>
          </defs>

          {/* Background circle track */}
          <circle
            className="gauge-bg-circle"
            cx="85"
            cy="85"
            r={radius}
          />

          {/* Active dynamic load stroke */}
          <circle
            className="gauge-value-circle"
            cx="85"
            cy="85"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Center Readout with Maximum Contrast */}
        <div className="gauge-center-content">
          <span className="gauge-percentage">{loadPercentage}%</span>
          <span className="gauge-label" style={{ color: '#0F172A', fontWeight: 800 }}>
            Live Load
          </span>
          <span
            style={{
              fontSize: '0.925rem',
              fontWeight: 800,
              color: '#1D4ED8',
              marginTop: '0.2rem',
            }}
          >
            {formattedKw} kW
          </span>
        </div>
      </div>

      {/* Lower Metrics Ribbon inside Gauge Card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginTop: '1rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.45)',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            borderRadius: '12px',
            padding: '0.65rem 0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.65)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#0F172A', fontWeight: 700, display: 'block' }}>
            Grid Capacity
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
            {(maxCapacity / 1000).toFixed(1)} kW
          </span>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            borderRadius: '12px',
            padding: '0.65rem 0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.65)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#0F172A', fontWeight: 700, display: 'block' }}>
            Active Loads
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
            {activeCount} Appliances
          </span>
        </div>
      </div>

      {/* Footer explanation with Dark Slate */}
      <p
        style={{
          fontSize: '0.775rem',
          color: '#1E293B',
          textAlign: 'center',
          marginTop: '0.85rem',
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        {statusInfo.desc}
      </p>
    </div>
  );
}
