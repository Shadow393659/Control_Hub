import React from 'react';
import { Power, Trash2, Zap } from 'lucide-react';

export default function ApplianceCard({ appliance, onToggle, onDelete }) {
  if (!appliance) return null;

  const { _id, name, room, type, status, powerUsage } = appliance;

  return (
    <div className={`card card-hover`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>
              {room || 'Unassigned'}
            </span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {name}
            </h3>
          </div>
          <span className={`badge ${status ? 'badge-success' : 'badge-neutral'}`}>
            {status ? 'ON' : 'OFF'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          <Zap size={14} style={{ color: status ? 'var(--warning)' : 'var(--text-subtle)' }} />
          <span>{powerUsage || 0} Watts</span>
          <span style={{ color: 'var(--text-subtle)', margin: '0 0.25rem' }}>•</span>
          <span style={{ textTransform: 'capitalize' }}>{type || 'General'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={() => onToggle && onToggle(_id, status)}
          className={`btn btn-sm ${status ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, marginRight: '0.5rem' }}
        >
          <Power size={14} />
          <span>{status ? 'Turn Off' : 'Turn On'}</span>
        </button>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(_id, name)}
            className="btn btn-sm btn-outline"
            title="Delete device"
            style={{ padding: '0.4rem 0.6rem', color: 'var(--text-muted)' }}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
