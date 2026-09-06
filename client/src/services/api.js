const API_BASE_URL = 'http://localhost:5000/api';

export const INITIAL_DUMMY_DEVICES = [
  {
    _id: 'sample-1',
    name: 'Living Room Air Conditioner',
    room: 'Living Room',
    type: 'ac',
    status: true,
    powerUsage: 1450,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'sample-2',
    name: 'Master Bedroom Ambient Light',
    room: 'Master Bedroom',
    type: 'light',
    status: true,
    powerUsage: 25,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'sample-3',
    name: 'Kitchen Smart Geyser',
    room: 'Kitchen',
    type: 'geyser',
    status: false,
    powerUsage: 2000,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'sample-4',
    name: 'Balcony High-Speed Fan',
    room: 'Balcony',
    type: 'fan',
    status: true,
    powerUsage: 70,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'sample-5',
    name: 'Home Theater 4K Smart TV',
    room: 'Living Room',
    type: 'tv',
    status: false,
    powerUsage: 120,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'sample-6',
    name: 'Study Room Desk Lamp',
    room: 'Study Room',
    type: 'light',
    status: true,
    powerUsage: 15,
    createdAt: new Date().toISOString(),
  },
];

// Helper to get cached local state if offline
const getLocalData = () => {
  const local = localStorage.getItem('controlhub_appliances');
  if (!local) {
    localStorage.setItem('controlhub_appliances', JSON.stringify(INITIAL_DUMMY_DEVICES));
    return INITIAL_DUMMY_DEVICES;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return INITIAL_DUMMY_DEVICES;
  }
};

const saveLocalData = (data) => {
  localStorage.setItem('controlhub_appliances', JSON.stringify(data));
};

export const checkBackendStatus = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      return { online: true };
    }
    return { online: false };
  } catch (error) {
    return { online: false };
  }
};

export const fetchAppliances = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/appliances`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    if (result.success && Array.isArray(result.data)) {
      saveLocalData(result.data);
      return { data: result.data, isLive: true };
    }
    throw new Error('Invalid response structure');
  } catch (err) {
    // Fallback to local storage mock data
    const local = getLocalData();
    return { data: local, isLive: false };
  }
};

export const toggleApplianceStatus = async (id, currentStatus) => {
  try {
    const res = await fetch(`${API_BASE_URL}/appliances/${id}/toggle`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: !currentStatus }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return { data: result.data, isLive: true };
  } catch (err) {
    // Fallback to updating local storage
    const local = getLocalData();
    const updated = local.map((item) =>
      item._id === id ? { ...item, status: !currentStatus } : item
    );
    saveLocalData(updated);
    const item = updated.find((d) => d._id === id);
    return { data: item, isLive: false };
  }
};

export const createAppliance = async (applianceData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/appliances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applianceData),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const result = await res.json();
    return { data: result.data, isLive: true };
  } catch (err) {
    const local = getLocalData();
    const newItem = {
      _id: `local-${Date.now()}`,
      ...applianceData,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...local];
    saveLocalData(updated);
    return { data: newItem, isLive: false };
  }
};

export const deleteAppliance = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/appliances/${id}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { success: true, isLive: true };
  } catch (err) {
    const local = getLocalData();
    const updated = local.filter((d) => d._id !== id);
    saveLocalData(updated);
    return { success: true, isLive: false };
  }
};
