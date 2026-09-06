import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/controlhub', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Warning: Could not connect to MongoDB: ${error.message}`);
    console.warn(`[MongoDB] Tip: Ensure MongoDB service is running, or set MONGODB_URI in server/.env`);
  }
};

export default connectDB;
