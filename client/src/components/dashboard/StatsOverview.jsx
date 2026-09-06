import React from 'react';
import { Zap, Power, Activity, ShieldCheck } from 'lucide-react';

export default function StatsOverview({ totalDevices = 0, activeDevices = 0, totalPower = 0, isOnline = true }) {
  return (
    <section className="stats-overview" style={{ marginBottom: '2rem' }}>
      <div className="grid-cards">
        {/* Metric 1: Total Devices */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Connected Devices</span>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-text)' }}>
              <Power size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{totalDevices}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered across all rooms</span>
        </div>

        {/* Metric 2: Active Devices */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Currently Active</span>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <Activity size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{activeDevices}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powered ON right now</span>
        </div>

        {/* Metric 3: Total Power Draw */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Live Power Draw</span>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
              <Zap size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{totalPower} W</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instantaneous load</span>
        </div>

        {/* Metric 4: System Health */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Network Status</span>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: isOnline ? 'var(--success-light)' : 'var(--danger-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{isOnline ? 'Online' : 'Offline'}</div>
          <span style={{ fontSize: '0.8rem', color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
            {isOnline ? 'Gateway synchronized' : 'Operating in fallback mode'}
          </span>
        </div>
      </div>
    </section>
  );
}
