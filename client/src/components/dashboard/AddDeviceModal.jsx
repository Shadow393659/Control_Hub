import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function AddDeviceModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Living Room');
  const [type, setType] = useState('light');
  const [powerUsage, setPowerUsage] = useState(50);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (onAdd) {
      onAdd({
        name,
        room,
        type,
        powerUsage: Number(powerUsage),
        status: false,
      });
    }

    setName('');
    setPowerUsage(50);
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Smart Appliance</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.35rem 0.5rem' }}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="device-name">Device Name</label>
            <input
              id="device-name"
              type="text"
              required
              placeholder="e.g. Ceiling Chandelier, Bedroom AC"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="device-room">Room / Area</label>
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
                <option value="Study Room">Study Room</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="device-type">Device Type</label>
              <select
                id="device-type"
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="ac">Air Conditioner</option>
                <option value="fan">Fan</option>
                <option value="geyser">Geyser / Heater</option>
                <option value="tv">Television / Media</option>
                <option value="other">Other Appliance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="device-wattage">Power Rating (Watts)</label>
            <input
              id="device-wattage"
              type="number"
              min="0"
              required
              className="form-input"
              value={powerUsage}
              onChange={(e) => setPowerUsage(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
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
              <Plus size={16} />
              <span>Register Device</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
