import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Flame, Wind, Lightbulb } from 'lucide-react';

export default function ScheduleAlertPanel() {
  const [activeTab, setActiveTab] = useState('schedules'); // 'schedules' | 'activity'

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: 'AC Eco Temperature Mode',
      room: 'Living Room',
      time: '11:00 PM',
      icon: Wind,
      enabled: true,
    },
    {
      id: 2,
      title: 'Ambient Warm Light Dimming',
      room: 'Master Bedroom',
      time: '10:30 PM',
      icon: Lightbulb,
      enabled: true,
    },
    {
      id: 3,
      title: 'Geyser Morning Pre-heat',
      room: 'Kitchen / Bath',
      time: '06:45 AM',
      icon: Flame,
      enabled: false,
    },
  ]);

  const activityLogs = [
    {
      id: 1,
      title: 'Living Room AC Load Synced',
      detail: 'Switched ON via Smart Hub, drawing 1.45 kW nominal load.',
      time: '3 min ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'Bedroom Ambient Light Adjusted',
      detail: 'Intensity level set to 85% with smooth ramp.',
      time: '18 min ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'Telemetry Cycle Completed',
      detail: 'All appliance nodes responded with 0 packet drops.',
      time: '42 min ago',
      type: 'success',
    },
    {
      id: 4,
      title: 'Standby Protection Activated',
      detail: 'Smart TV power idle mode engaged automatically.',
      time: '1 hr ago',
      type: 'warning',
    },
  ];

  const handleToggleSchedule = (id) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      {/* Panel Header with Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          paddingBottom: '0.65rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={17} color="#2563EB" strokeWidth={2.6} />
          <h3 style={{ fontSize: '0.975rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.015em' }}>
            Hub Automation
          </h3>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.65)',
            padding: '3px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('schedules')}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'schedules' ? '#FFFFFF' : 'transparent',
              color: '#0F172A',
              boxShadow: activeTab === 'schedules' ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Schedules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'activity' ? '#FFFFFF' : 'transparent',
              color: '#0F172A',
              boxShadow: activeTab === 'activity' ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Activity Log
          </button>
        </div>
      </div>

      {/* Content for Schedules Tab */}
      {activeTab === 'schedules' ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {schedules.map((schedule) => {
            const Icon = schedule.icon;
            return (
              <div key={schedule.id} className="schedule-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: schedule.enabled ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.65)',
                      color: schedule.enabled ? '#1D4ED8' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: schedule.enabled ? '1px solid rgba(37, 99, 235, 0.35)' : '1px solid rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <Icon size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        lineHeight: 1.25,
                      }}
                    >
                      {schedule.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>
                      {schedule.room} &bull; <strong style={{ color: '#1D4ED8' }}>{schedule.time}</strong>
                    </span>
                  </div>
                </div>

                <label className="ios-switch" style={{ width: 38, height: 22 }}>
                  <input
                    type="checkbox"
                    checked={schedule.enabled}
                    onChange={() => handleToggleSchedule(schedule.id)}
                  />
                  <span
                    className="ios-switch-slider"
                    style={{
                      borderRadius: '22px',
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        /* Content for Activity Log Tab with Crisp Legibility */
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activityLogs.map((log) => (
            <div key={log.id} className="activity-log-item">
              <div style={{ marginTop: '2px' }}>
                {log.type === 'warning' ? (
                  <AlertCircle size={16} color="#D97706" strokeWidth={2.4} />
                ) : (
                  <CheckCircle2 size={16} color="#059669" strokeWidth={2.4} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A' }}>
                    {log.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#334155' }}>{log.time}</span>
                </div>
                <p style={{ fontSize: '0.775rem', fontWeight: 500, color: '#1E293B', marginTop: '0.2rem', lineHeight: 1.35 }}>
                  {log.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
