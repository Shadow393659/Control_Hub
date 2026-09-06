# ControlHub ⚡
### Smart Home Automation & Monitoring System (MERN Stack)

**ControlHub** is a modern, responsive Smart Home Automation & Monitoring dashboard built with React (Vite) and Node.js / Express / MongoDB. It allows users to monitor real-time power consumption, toggle appliances in different rooms, add custom smart appliances, and filter by zones.

---

## 📁 Project Structure

```text
ControlHub/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with logo, live power, and API status
│   │   │   ├── StatsOverview.jsx   # Metrics (Active units, Power kW/W, Zones)
│   │   │   ├── ApplianceCard.jsx   # Card with tactile switch & power draw
│   │   │   ├── AddDeviceModal.jsx  # Form modal to add custom appliances
│   │   │   └── Dashboard.jsx       # Grid layout with room filters & search
│   │   ├── services/
│   │   │   └── api.js              # REST API client with local fallback
│   │   ├── App.jsx                 # App state and toast notifications
│   │   ├── index.css               # Glassmorphism dark theme styling
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # Node.js / Express Backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection logic
│   ├── controllers/
│   │   └── applianceController.js  # Appliance CRUD & Toggle logic
│   ├── models/
│   │   └── Appliance.js            # Mongoose Schema
│   ├── routes/
│   │   └── applianceRoutes.js      # REST API Endpoints
│   ├── seeder/
│   │   └── seed.js                 # Sample database seeder
│   ├── .env                        # Port & MongoDB URI config
│   ├── package.json
│   └── server.js                   # Express server entry point
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Start the Backend Server

Open a terminal window in the root directory:

```bash
cd server
npm run dev
```

*Server will run at:* `http://localhost:5000`  
*API Health check:* `http://localhost:5000/api/health`

#### (Optional) Seed Sample Database Data:
Ensure MongoDB is running locally, then run:
```bash
cd server
npm run seed
```

---

### 2. Start the Frontend Client

Open a second terminal window:

```bash
cd client
npm run dev
```

*Vite frontend will launch at:* `http://localhost:5173`

> 💡 **Offline / Demo Resilience:** If MongoDB is not running, the frontend will automatically use interactive local mock data so you can test all features (toggling, adding devices, filtering) immediately without errors.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status & uptime |
| `GET` | `/api/appliances` | Get all appliances (supports `?room=Living+Room`) |
| `POST` | `/api/appliances` | Create a new appliance |
| `GET` | `/api/appliances/:id` | Get appliance details |
| `PATCH`| `/api/appliances/:id/toggle` | Toggle appliance ON/OFF state |
| `PUT` | `/api/appliances/:id` | Update appliance details |
| `DELETE`| `/api/appliances/:id` | Delete an appliance |

---

## 🎨 Features
- **Real-Time Energy Metering**: Live power calculation in Watts / Kilowatts based on active appliances.
- **Dynamic Icons & Animations**: Device-specific icons with spinning fan and pulsing lamp animations when ON.
- **Room Filtering & Live Search**: Filter by Living Room, Master Bedroom, Kitchen, Balcony, or custom zones.
- **Tactile Toggle Switches**: Smooth ON/OFF switches with visual feedback and toast notifications.
- **Batch Actions**: One-click "Turn All ON" and "Turn All OFF".
- **Glassmorphic Cyber-Clean Design**: Tailored dark-mode UI with glowing accents and responsive grid.
