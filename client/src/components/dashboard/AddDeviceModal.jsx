import React, { useState } from 'react';
import { X, Plus, Cpu, Zap } from 'lucide-react';

export default function AddDeviceModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Living Room');
  const [type, setType] = useState('light');
  const [powerUsage, setPowerUsage] = useState(60);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (onAdd) {
      onAdd({
        name: name.trim(),
        room,
        type,
        powerUsage: Number(powerUsage) || 0,
        status: false,
      });
    }

    setName('');
    setPowerUsage(60);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={16} strokeWidth={2.4} />
            </div>
            <h2 className="modal-title">Register Smart Device</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.3rem', width: 28, height: 28 }}
            title="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          {/* Device Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="device-name">
              Device Name
            </label>
            <input
              id="device-name"
              type="text"
              required
              placeholder="e.g. Ceiling Chandelier, Bedroom AC"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Grid: Room & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="device-room">
                Room / Zone
              </label>
              <select
                id="device-room"
                className="form-input"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="Living Room">Living Room</option>
                <option value="Master Bedroom">Master Bedroom</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Balcony">Balcony</option>
                <option value="Garage">Garage</option>
                <option value="Study Room">Study Room</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="device-type">
                Category
              </label>
              <select
                id="device-type"
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="light">Light & Lamp</option>
                <option value="ac">Air Conditioner</option>
                <option value="fan">Ceiling Fan</option>
                <option value="geyser">Geyser / Water Heater</option>
                <option value="tv">Television / Media</option>
                <option value="other">Other Appliance</option>
              </select>
            </div>
          </div>

          {/* Rated Wattage */}
          <div className="form-group">
            <label className="form-label" htmlFor="device-wattage">
              Rated Wattage (Watts)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="device-wattage"
                type="number"
                min="0"
                max="10000"
                required
                className="form-input"
                value={powerUsage}
                onChange={(e) => setPowerUsage(e.target.value)}
                placeholder="e.g. 75"
              />
              <span
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.775rem',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              >
                Watts
              </span>
            </div>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', marginTop: '0.25rem', display: 'block' }}>
              Used to calculate real-time grid telemetry and energy estimations.
            </span>
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '1.5rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Plus size={15} strokeWidth={2.4} />
              <span>Register Device</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
