import React from 'react';
import { Filter, Zap, Power } from 'lucide-react';

export default function RoomFilter({
  rooms = [],
  selectedRoom = 'all',
  onSelectRoom,
  statusFilter = 'all',
  onStatusFilterChange,
}) {
  // Canonical room tabs list as requested: All Rooms, Living Room, Bedroom, Kitchen, Balcony, Garage
  const standardRooms = [
    { id: 'all', label: 'All Rooms' },
    { id: 'living room', label: 'Living Room' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'garage', label: 'Garage' },
  ];

  // Also include any other room present in database not in standard list (e.g., Study Room)
  const additionalRooms = rooms
    .filter(
      (r) =>
        r &&
        !standardRooms.some(
          (sr) =>
            sr.id === r.toLowerCase() ||
            (sr.id === 'bedroom' && r.toLowerCase().includes('bedroom'))
        )
    )
    .map((r) => ({ id: r.toLowerCase(), label: r }));

  const allTabs = [...standardRooms, ...additionalRooms];

  const statusOptions = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active Only', icon: Power },
    { id: 'high-power', label: 'High Power', icon: Zap },
  ];

  return (
    <div
      className="filter-bar-container"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '0.65rem 0.85rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '1.75rem',
      }}
    >
      {/* Left side: Horizontal Pill Tabs */}
      <div
        className="room-pill-tabs"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          overflowX: 'auto',
          maxWidth: '100%',
          paddingBottom: '2px',
        }}
      >
        {allTabs.map((tab) => {
          const isSelected =
            selectedRoom.toLowerCase() === tab.id.toLowerCase() ||
            (tab.id === 'bedroom' && selectedRoom.toLowerCase().includes('bedroom'));

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectRoom && onSelectRoom(tab.id)}
              style={{
                padding: '0.38rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: isSelected ? 600 : 500,
                backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                color: isSelected ? '#ffffff' : 'var(--text-body)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-subtle)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-body)';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right side: Status Filter Toggle */}
      <div
        className="status-toggle-group"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface-subtle)',
          padding: '0.2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          gap: '0.2rem',
        }}
      >
        {statusOptions.map((opt) => {
          const isActive = statusFilter === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onStatusFilterChange && onStatusFilterChange(opt.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.28rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.785rem',
                fontWeight: isActive ? 600 : 500,
                backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
              }}
            >
              {Icon && <Icon size={12} strokeWidth={2.4} />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
