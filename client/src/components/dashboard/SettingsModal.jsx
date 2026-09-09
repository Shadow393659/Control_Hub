import React, { useState } from 'react';
import { X, Settings, Sliders, ShieldCheck, Zap } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [ecoMode, setEcoMode] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [peakThreshold, setPeakThreshold] = useState(3500);
  const [syncRate, setSyncRate] = useState('5s');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '10px',
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(37, 99, 235, 0.3)',
              }}
            >
              <Settings size={18} strokeWidth={2.4} />
            </div>
            <h2 className="modal-title">Hub Telemetry Settings</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="frosted-icon-btn"
            style={{ width: 32, height: 32, borderRadius: '8px' }}
            title="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body Settings Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Setting 1: Eco Automation Mode */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'rgba(241, 245, 249, 0.8)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                Eco Power Throttling
              </h4>
              <p style={{ fontSize: '0.775rem', color: '#334155', marginTop: '0.15rem' }}>
                Automatically reduces standby appliance wattage during peak hours.
              </p>
            </div>
            <label className="ios-switch">
              <input
                type="checkbox"
                checked={ecoMode}
                onChange={() => setEcoMode(!ecoMode)}
              />
              <span className="ios-switch-slider" />
            </label>
          </div>

          {/* Setting 2: Audible Alert Beeper */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'rgba(241, 245, 249, 0.8)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                Critical Audio Chime
              </h4>
              <p style={{ fontSize: '0.775rem', color: '#334155', marginTop: '0.15rem' }}>
                Sound audible alert chime when total load breaches 85%.
              </p>
            </div>
            <label className="ios-switch">
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={() => setSoundAlerts(!soundAlerts)}
              />
              <span className="ios-switch-slider" />
            </label>
          </div>

          {/* Setting 3: Peak Threshold */}
          <div
            style={{
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'rgba(241, 245, 249, 0.8)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                Peak Power Ceiling
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#2563EB' }}>
                {peakThreshold} Watts
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="6000"
              step="250"
              value={peakThreshold}
              onChange={(e) => setPeakThreshold(Number(e.target.value))}
              className="vision-slider"
            />
          </div>

          {/* Setting 4: Telemetry Refresh Interval */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'rgba(241, 245, 249, 0.8)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
                Gateway Polling Rate
              </h4>
              <p style={{ fontSize: '0.775rem', color: '#334155', marginTop: '0.15rem' }}>
                Frequency of background WebSocket sensor sync.
              </p>
            </div>
            <select
              value={syncRate}
              onChange={(e) => setSyncRate(e.target.value)}
              className="form-input"
              style={{ width: '90px', padding: '0.35rem 0.6rem', fontSize: '0.825rem', fontWeight: 600 }}
            >
              <option value="2s">2s</option>
              <option value="5s">5s</option>
              <option value="15s">15s</option>
              <option value="60s">60s</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.65rem',
            marginTop: '1.5rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="vision-add-btn"
            style={{ padding: '0.5rem 1.25rem' }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
