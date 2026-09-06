import React, { useState, useEffect } from 'react';
import StatsOverview from '../components/dashboard/StatsOverview';
import ApplianceCard from '../components/dashboard/ApplianceCard';
import AddDeviceModal from '../components/dashboard/AddDeviceModal';
import RoomFilter from '../components/dashboard/RoomFilter';
import { Plus, SlidersHorizontal, RefreshCw } from 'lucide-react';
import {
  fetchAppliances,
  toggleApplianceStatus,
  createAppliance,
  deleteAppliance,
  checkBackendStatus,
  INITIAL_DUMMY_DEVICES,
} from '../services/api';

export default function DashboardPage() {
  const [appliances, setAppliances] = useState(INITIAL_DUMMY_DEVICES);
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const health = await checkBackendStatus();
      setIsBackendOnline(health.online);

      const result = await fetchAppliances();
      if (result.data && result.data.length > 0) {
        setAppliances(result.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute stats
  const totalDevices = appliances.length;
  const activeDevices = appliances.filter((a) => a.status).length;
  const totalPower = appliances
    .filter((a) => a.status)
    .reduce((sum, a) => sum + (Number(a.powerUsage) || 0), 0);

  // Extract unique rooms
  const uniqueRooms = Array.from(new Set(appliances.map((a) => a.room).filter(Boolean)));

  // Filtered list
  const filteredAppliances = selectedRoom === 'all'
    ? appliances
    : appliances.filter((a) => a.room?.toLowerCase() === selectedRoom.toLowerCase());

  // Handlers
  const handleToggle = async (id, currentStatus) => {
    setAppliances((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: !currentStatus } : a))
    );
    await toggleApplianceStatus(id, currentStatus);
  };

  const handleAddAppliance = async (newDevice) => {
    const res = await createAppliance(newDevice);
    if (res.data) {
      setAppliances((prev) => [res.data, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    setAppliances((prev) => prev.filter((a) => a._id !== id));
    await deleteAppliance(id);
  };

  return (
    <div className="page-container">
      {/* Dashboard Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Smart Home Control Panel
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            Live status and remote switching for connected smart devices
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={loadData}
            className="btn btn-secondary"
            title="Refresh devices"
          >
            <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Add Appliance</span>
          </button>
        </div>
      </div>

      {/* Stats Overview Bar */}
      <StatsOverview
        totalDevices={totalDevices}
        activeDevices={activeDevices}
        totalPower={totalPower}
        isOnline={isBackendOnline}
      />

      {/* Room Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Device Grid</h2>
        <RoomFilter
          rooms={uniqueRooms}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
        />
      </div>

      {/* Appliances Grid */}
      {filteredAppliances.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
          <SlidersHorizontal size={36} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No appliances found
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            No devices are currently registered under this room filter.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} />
            <span>Add First Device</span>
          </button>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredAppliances.map((appliance) => (
            <ApplianceCard
              key={appliance._id}
              appliance={appliance}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Device Modal Dialog */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAppliance}
      />
    </div>
  );
}
