import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopRoomBar from '../components/dashboard/TopRoomBar';
import StatsOverview from '../components/dashboard/StatsOverview';
import ApplianceCard from '../components/dashboard/ApplianceCard';
import PowerTelemetryGauge from '../components/dashboard/PowerTelemetryGauge';
import ScheduleAlertPanel from '../components/dashboard/ScheduleAlertPanel';
import AddDeviceModal from '../components/dashboard/AddDeviceModal';
import SettingsModal from '../components/dashboard/SettingsModal';
import { SlidersHorizontal, Plus, RefreshCw, Zap, Clock } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavTab, setActiveNavTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const schedulerRef = useRef(null);
  const telemetryRef = useRef(null);
  const devicesRef = useRef(null);

  // Load telemetry data from API or localStorage
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
      console.error('Failed to load telemetry data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Listen for global navbar search or add events if triggered elsewhere
  useEffect(() => {
    const handleNavbarSearch = (e) => {
      setSearchQuery(e.detail?.query || '');
    };
    const handleNavbarAdd = () => {
      setIsAddModalOpen(true);
    };

    window.addEventListener('controlhub-search', handleNavbarSearch);
    window.addEventListener('controlhub-open-add-device', handleNavbarAdd);

    return () => {
      window.removeEventListener('controlhub-search', handleNavbarSearch);
      window.removeEventListener('controlhub-open-add-device', handleNavbarAdd);
    };
  }, []);

  // Sidebar Navigation Action Dispatcher
  const handleNavTabChange = (tabId) => {
    setActiveNavTab(tabId);

    if (tabId === 'dashboard') {
      setSelectedRoom('all');
      setSearchQuery('');
      setIsAlertsOpen(false);
      devicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'analytics') {
      setIsAlertsOpen(false);
      telemetryRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'devices') {
      setSelectedRoom('all');
      setIsAlertsOpen(false);
      devicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'scheduler') {
      setIsAlertsOpen(false);
      schedulerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'alerts') {
      setIsAlertsOpen((prev) => !prev);
    } else if (tabId === 'settings') {
      setIsSettingsOpen(true);
    }
  };

  // Compute metrics
  const totalDevices = appliances.length;
  const activeDevices = appliances.filter((a) => a.status).length;
  const totalPower = appliances
    .filter((a) => a.status)
    .reduce((sum, a) => {
      const wattage = Number(a.powerUsage) || 0;
      const intensityFactor = a.intensity !== undefined ? (0.3 + 0.7 * (a.intensity / 100)) : 1;
      return sum + Math.round(wattage * intensityFactor);
    }, 0);

  // Multi-tier filtering: Room + Search Query + Analytics Mode
  const filteredAppliances = appliances.filter((appliance) => {
    // Analytics view mode: highlight high-draw or active drawing appliances
    if (activeNavTab === 'analytics') {
      if (!appliance.status && (Number(appliance.powerUsage) || 0) < 500) {
        return false;
      }
    }

    // 1. Room filter
    if (selectedRoom !== 'all') {
      const appRoom = (appliance.room || '').toLowerCase();
      const targetRoom = selectedRoom.toLowerCase();
      if (targetRoom === 'bedroom') {
        if (!appRoom.includes('bedroom')) return false;
      } else if (!appRoom.includes(targetRoom) && appRoom !== targetRoom) {
        return false;
      }
    }

    // 2. Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = (appliance.name || '').toLowerCase().includes(q);
      const matchRoom = (appliance.room || '').toLowerCase().includes(q);
      const matchType = (appliance.type || '').toLowerCase().includes(q);
      if (!matchName && !matchRoom && !matchType) return false;
    }

    return true;
  });

  // Toggle appliance status
  const handleToggle = async (id, currentStatus) => {
    setAppliances((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: !currentStatus } : a))
    );
    await toggleApplianceStatus(id, currentStatus);
  };

  // Intensity slider adjustments
  const handleIntensityChange = (id, intensity) => {
    setAppliances((prev) =>
      prev.map((a) => (a._id === id ? { ...a, intensity, status: intensity > 0 } : a))
    );
  };

  // Add new device
  const handleAddAppliance = async (newDevice) => {
    const res = await createAppliance(newDevice);
    if (res.data) {
      setAppliances((prev) => [res.data, ...prev]);
    }
  };

  // Delete device
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from ControlHub?`)) {
      setAppliances((prev) => prev.filter((a) => a._id !== id));
      await deleteAppliance(id);
    }
  };

  return (
    <div className="dashboard-shell">
      <div className="dashboard-layout">
        {/* 1. Left Slim Icon Sidebar Navigation */}
        <Sidebar
          activeTab={activeNavTab}
          onTabChange={handleNavTabChange}
          unreadAlertsCount={2}
          isOnline={isBackendOnline}
        />

        {/* 2. Main Frosted Glassmorphism Content Area */}
        <main className="vision-main" role="main">
          {/* Top Room Navigation Bar with Z-Index 100 Stacking Context */}
          <TopRoomBar
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenAddDevice={() => setIsAddModalOpen(true)}
            unreadCount={2}
            isAlertsOpen={isAlertsOpen}
            onToggleAlerts={setIsAlertsOpen}
          />

          {/* Top Metric Widget Ribbon with High-Contrast Dark Slate Text */}
          <StatsOverview
            appliances={appliances}
            totalDevices={totalDevices}
            activeDevices={activeDevices}
            totalPower={totalPower}
            isOnline={isBackendOnline}
            onSync={loadData}
            isSyncing={isLoading}
          />

          {/* 2-Column Content Split: Devices Grid on Left, Gauge & Schedules on Right */}
          <div className="dashboard-content-grid">
            {/* Left Column: Device Control Cards */}
            <section className="devices-section-col" ref={devicesRef}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.25rem 0.5rem',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      letterSpacing: '-0.025em',
                      textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {activeNavTab === 'analytics'
                      ? 'High-Power Draw Telemetry'
                      : selectedRoom === 'all'
                      ? 'All Active Devices'
                      : `${selectedRoom.toUpperCase()} APPLIANCES`}
                  </h2>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E293B', marginTop: '0.1rem' }}>
                    {filteredAppliances.length} smart devices monitored in real time
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {activeNavTab === 'analytics' && (
                    <span
                      style={{
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'rgba(37, 99, 235, 0.15)',
                        border: '1px solid rgba(37, 99, 235, 0.35)',
                        color: '#1D4ED8',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Zap size={12} strokeWidth={2.6} /> Analytics Filter
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={loadData}
                    className="frosted-icon-btn"
                    style={{ width: 36, height: 36, borderRadius: '10px' }}
                    title="Refresh device statuses"
                  >
                    <RefreshCw size={15} className={isLoading ? 'spin' : ''} />
                  </button>
                </div>
              </div>

              {filteredAppliances.length === 0 ? (
                <div
                  className="glass-card"
                  style={{
                    textAlign: 'center',
                    padding: '3.5rem 1.5rem',
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      color: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <SlidersHorizontal size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
                    No matching smart appliances
                  </h3>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', maxWidth: '380px', margin: '0 auto 1.25rem' }}>
                    No devices found matching &quot;{searchQuery || selectedRoom}&quot;. Reset your filters or register a new appliance.
                  </p>
                  <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRoom('all');
                        setSearchQuery('');
                        setActiveNavTab('dashboard');
                      }}
                      className="frosted-icon-btn"
                      style={{ width: 'auto', padding: '0.5rem 1.15rem', borderRadius: '12px', fontSize: '0.825rem', fontWeight: 700 }}
                    >
                      Reset Filters
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(true)}
                      className="vision-add-btn"
                    >
                      <Plus size={15} strokeWidth={2.6} />
                      <span>Add Device</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="appliances-grid">
                  {filteredAppliances.map((appliance) => (
                    <ApplianceCard
                      key={appliance._id}
                      appliance={appliance}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onIntensityChange={handleIntensityChange}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Right Column: Telemetry Gauge & Automation / Alerts */}
            <aside className="telemetry-sidebar-col" aria-label="Telemetry & Automations">
              {/* Circular Dial Power Telemetry Gauge Widget */}
              <div ref={telemetryRef} style={{ transition: 'all 0.3s ease' }}>
                <PowerTelemetryGauge
                  totalPower={totalPower}
                  maxCapacity={3500}
                  activeCount={activeDevices}
                />
              </div>

              {/* Schedule & Alert Panel */}
              <div ref={schedulerRef} style={{ transition: 'all 0.3s ease' }}>
                <ScheduleAlertPanel />
              </div>
            </aside>
          </div>
        </main>

        {/* Add Device Modal Dialog (Z-Index 2000) */}
        <AddDeviceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddAppliance}
        />

        {/* Hub Settings Modal Dialog (Z-Index 2000) */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </div>
  );
}
