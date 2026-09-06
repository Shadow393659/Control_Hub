import React from 'react';

export default function RoomFilter({ rooms = [], selectedRoom = 'all', onSelectRoom }) {
  const allRooms = ['all', ...rooms];

  return (
    <div className="room-filter" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
      {allRooms.map((room) => {
        const isSelected = selectedRoom.toLowerCase() === room.toLowerCase();
        return (
          <button
            key={room}
            type="button"
            onClick={() => onSelectRoom && onSelectRoom(room)}
            className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
            style={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}
          >
            {room === 'all' ? 'All Devices' : room}
          </button>
        );
      })}
    </div>
  );
}
