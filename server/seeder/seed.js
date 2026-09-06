import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appliance from '../models/Appliance.js';

dotenv.config();

export const sampleAppliances = [
  {
    name: 'Living Room Air Conditioner',
    room: 'Living Room',
    type: 'ac',
    status: true,
    powerUsage: 1450,
  },
  {
    name: 'Master Bedroom Ceiling Light',
    room: 'Master Bedroom',
    type: 'light',
    status: true,
    powerUsage: 28,
  },
  {
    name: 'Kitchen Smart Geyser',
    room: 'Kitchen',
    type: 'geyser',
    status: false,
    powerUsage: 2000,
  },
  {
    name: 'Balcony Ultra-Speed Fan',
    room: 'Balcony',
    type: 'fan',
    status: true,
    powerUsage: 65,
  },
  {
    name: 'Home Theater 4K OLED TV',
    room: 'Living Room',
    type: 'tv',
    status: false,
    powerUsage: 130,
  },
  {
    name: 'Study Room Desk Lamp',
    room: 'Study Room',
    type: 'light',
    status: true,
    powerUsage: 15,
  },
  {
    name: 'Bathroom Water Heater',
    room: 'Bathroom',
    type: 'geyser',
    status: false,
    powerUsage: 1800,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/controlhub';
    console.log(`[Seeder] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });

    console.log('[Seeder] Clearing existing appliances...');
    await Appliance.deleteMany();

    console.log('[Seeder] Inserting sample appliances...');
    const created = await Appliance.insertMany(sampleAppliances);
    console.log(`[Seeder] Successfully inserted ${created.length} sample appliances!`);

    await mongoose.disconnect();
    console.log('[Seeder] Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder] Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// If run directly via `node seeder/seed.js` or `npm run seed`
if (process.argv[1] && process.argv[1].includes('seed.js')) {
  seedDB();
}
