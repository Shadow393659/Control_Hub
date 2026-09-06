import mongoose from 'mongoose';

const applianceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an appliance name'],
      trim: true,
    },
    room: {
      type: String,
      required: [true, 'Please specify the room'],
      trim: true,
      default: 'Living Room',
    },
    type: {
      type: String,
      required: [true, 'Please specify the appliance type'],
      enum: ['light', 'ac', 'fan', 'geyser', 'tv', 'heater', 'speaker', 'other'],
      default: 'light',
    },
    status: {
      type: Boolean,
      default: false,
    },
    powerUsage: {
      type: Number,
      required: [true, 'Please specify power consumption in Watts'],
      min: [0, 'Power usage cannot be negative'],
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Appliance = mongoose.model('Appliance', applianceSchema);

export default Appliance;
