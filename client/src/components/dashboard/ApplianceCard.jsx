import React, { useState, useRef, useEffect } from 'react';
import {
  Lightbulb,
  Wind,
  Fan,
  Flame,
  Tv,
  Cpu,
  Zap,
  MoreVertical,
  Trash2,
  Power,
  Copy,
  Check,
  Sliders,
} from 'lucide-react';

export default function ApplianceCard({
  appliance,
  onToggle,
  onDelete,
  onIntensityChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [intensity, setIntensity] = useState(appliance?.intensity ?? (appliance?.status ? 85 : 0));
  const menuRef = useRef(null);

  if (!appliance) return null;

  const { _id, name, room, type, status, powerUsage } = appliance;

  // Resolve Category Icon
  const getCategoryIcon = (categoryType) => {
    const t = (categoryType || '').toLowerCase();
    if (t.includes('light')) return Lightbulb;
    if (t.includes('ac') || t.includes('air') || t.includes('cool')) return Wind;
    if (t.includes('fan')) return Fan;
    if (t.includes('geyser') || t.includes('heat') || t.includes('boiler')) return Flame;
    if (t.includes('tv') || t.includes('media') || t.includes('screen')) return Tv;
    return Cpu;
  };

  const IconComponent = getCategoryIcon(type);

  // Close kebab menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  // Keep intensity in sync if status flips
  useEffect(() => {
    if (!status) {
      setIntensity(0);
    } else if (intensity === 0) {
      setIntensity(80);
    }
  }, [status]);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(_id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setMenuOpen(false);
    }, 1200);
  };

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setIntensity(val);
    if (!status && val > 0 && onToggle) {
      onToggle(_id, false);
    }
    if (onIntensityChange) {
      onIntensityChange(_id, val);
    }
  };

  const wattage = Number(powerUsage) || 0;
  // Calculate dynamic wattage when active based on intensity
  const dynamicWattage = status
    ? Math.round(wattage * (0.3 + 0.7 * (intensity / 100)))
    : 0;

  // Load badge classification with high-contrast colors
  const getLoadBadge = () => {
    if (wattage >= 1000) {
      return { text: 'High Draw', color: '#9A3412', bg: 'rgba(254, 215, 170, 0.85)', border: '#FDBA74' };
    }
    if (wattage >= 200) {
      return { text: 'Moderate Draw', color: '#1E40AF', bg: 'rgba(191, 219, 254, 0.85)', border: '#93C5FD' };
    }
    return { text: 'Eco / Low Draw', color: '#065F46', bg: 'rgba(167, 243, 208, 0.85)', border: '#6EE7B7' };
  };

  const loadBadge = getLoadBadge();

  // Label for slider based on device type
  const getSliderLabel = () => {
    const t = (type || '').toLowerCase();
    if (t.includes('light')) return 'Brightness';
    if (t.includes('ac') || t.includes('cool')) return 'Cooling Load';
    if (t.includes('fan')) return 'Fan Speed';
    if (t.includes('geyser') || t.includes('heat')) return 'Temp Target';
    if (t.includes('tv')) return 'Volume / Backlight';
    return 'Power Output';
  };

  return (
    <div
      className={`glass-card ${status ? 'active-device' : ''} ${menuOpen ? 'menu-open' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: menuOpen ? 50 : 10,
        minHeight: '235px',
      }}
    >
      {/* Top Header Row: Icon + Device Title & Type + Room Badge */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Category Icon with glowing frosted container */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '14px',
                background: status
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(96, 165, 250, 0.2))'
                  : 'rgba(255, 255, 255, 0.65)',
                color: status ? '#1D4ED8' : '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: status
                  ? '1px solid rgba(96, 165, 250, 0.7)'
                  : '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: status ? '0 0 16px rgba(37, 99, 235, 0.25)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <IconComponent size={20} strokeWidth={2.4} />
            </div>

            <div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                }}
              >
                {name}
              </h3>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#334155',
                  textTransform: 'capitalize',
                }}
              >
                {type || 'Appliance'}
              </span>
            </div>
          </div>

          {/* Room Badge with High Contrast */}
          <span
            style={{
              fontSize: '0.725rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              color: '#0F172A',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
            }}
          >
            {room || 'Living Room'}
          </span>
        </div>

        {/* Wattage & Power Load Readout */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            borderRadius: '12px',
            padding: '0.75rem 0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.65)',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.35rem',
            }}
          >
            <span style={{ fontSize: '0.775rem', color: '#0F172A', fontWeight: 700 }}>
              Rated Power
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.15rem 0.55rem',
                borderRadius: '6px',
                color: loadBadge.color,
                background: loadBadge.bg,
                border: `1px solid ${loadBadge.border}`,
              }}
            >
              {loadBadge.text}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
              }}
            >
              {status ? dynamicWattage : wattage}
            </span>
            <span style={{ fontSize: '0.825rem', color: '#1E293B', fontWeight: 700 }}>
              Watts
            </span>

            {status && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  color: '#047857',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Zap size={13} strokeWidth={2.6} /> Drawing Load
              </span>
            )}
          </div>
        </div>

        {/* Power Intensity Slider (Apple visionOS Style) */}
        <div className="vision-slider-wrapper">
          <div className="vision-slider-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0F172A', fontWeight: 700 }}>
              <Sliders size={13} color="#0F172A" />
              {getSliderLabel()}
            </span>
            <span style={{ color: status ? '#1D4ED8' : '#334155', fontWeight: 800 }}>
              {intensity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={handleSliderChange}
            className="vision-slider"
            style={{
              background: `linear-gradient(to right, #2563EB 0%, #2563EB ${intensity}%, rgba(148, 163, 184, 0.5) ${intensity}%, rgba(148, 163, 184, 0.5) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Bottom Controls: iOS Switch + Kebab Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.45)',
          marginTop: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Apple visionOS Tactical Toggle Switch */}
          <label
            className="ios-switch"
            title={status ? 'Turn OFF device' : 'Turn ON device'}
          >
            <input
              type="checkbox"
              checked={Boolean(status)}
              onChange={() => onToggle && onToggle(_id, status)}
            />
            <span className="ios-switch-slider" />
          </label>

          {/* Status Label with Crisp Text Contrast */}
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: status ? '#047857' : '#334155',
            }}
          >
            {status ? 'ONLINE' : 'STANDBY'}
          </span>
        </div>

        {/* Secondary Kebab Action Menu with Z-Index 1000 Fix */}
        <div className="kebab-menu-wrapper" ref={menuRef}>
          <button
            type="button"
            className="frosted-icon-btn"
            style={{ width: 34, height: 34, borderRadius: '10px' }}
            title="Device actions"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div className="kebab-dropdown">
              <button
                type="button"
                className="kebab-item"
                onClick={() => {
                  onToggle && onToggle(_id, status);
                  setMenuOpen(false);
                }}
              >
                <Power size={14} color="#1E293B" />
                <span>{status ? 'Turn Off' : 'Turn On'}</span>
              </button>

              <button
                type="button"
                className="kebab-item"
                onClick={handleCopyId}
              >
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} color="#1E293B" />}
                <span>{copied ? 'Copied ID' : 'Copy ID'}</span>
              </button>

              {onDelete && (
                <button
                  type="button"
                  className="kebab-item danger"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(_id, name);
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete Device</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
