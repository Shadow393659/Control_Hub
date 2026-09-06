import Appliance from '../models/Appliance.js';

// @desc    Get all appliances
// @route   GET /api/appliances
// @access  Public
export const getAppliances = async (req, res) => {
  try {
    const { room, type, status } = req.query;
    const filter = {};

    if (room && room !== 'All') {
      filter.room = room;
    }
    if (type && type !== 'all') {
      filter.type = type;
    }
    if (status !== undefined) {
      filter.status = status === 'true';
    }

    const appliances = await Appliance.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: appliances.length,
      data: appliances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appliances',
      error: error.message,
    });
  }
};

// @desc    Get single appliance by ID
// @route   GET /api/appliances/:id
// @access  Public
export const getApplianceById = async (req, res) => {
  try {
    const appliance = await Appliance.findById(req.params.id);
    if (!appliance) {
      return res.status(404).json({
        success: false,
        message: `Appliance not found with id of ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: appliance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appliance',
      error: error.message,
    });
  }
};

// @desc    Create a new appliance
// @route   POST /api/appliances
// @access  Public
export const createAppliance = async (req, res) => {
  try {
    const { name, room, type, status, powerUsage } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Appliance name is required',
      });
    }

    const appliance = await Appliance.create({
      name,
      room: room || 'Living Room',
      type: type || 'light',
      status: status || false,
      powerUsage: powerUsage !== undefined ? Number(powerUsage) : 50,
    });

    res.status(201).json({
      success: true,
      data: appliance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create appliance',
      error: error.message,
    });
  }
};

// @desc    Toggle appliance ON/OFF status
// @route   PATCH /api/appliances/:id/toggle
// @access  Public
export const toggleApplianceStatus = async (req, res) => {
  try {
    const appliance = await Appliance.findById(req.params.id);
    if (!appliance) {
      return res.status(404).json({
        success: false,
        message: `Appliance not found with id of ${req.params.id}`,
      });
    }

    // If explicit status provided in body, use it, otherwise flip current
    if (req.body && typeof req.body.status === 'boolean') {
      appliance.status = req.body.status;
    } else {
      appliance.status = !appliance.status;
    }

    await appliance.save();

    res.status(200).json({
      success: true,
      message: `Appliance is now ${appliance.status ? 'ON' : 'OFF'}`,
      data: appliance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to toggle appliance status',
      error: error.message,
    });
  }
};

// @desc    Update appliance details
// @route   PUT /api/appliances/:id
// @access  Public
export const updateAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appliance) {
      return res.status(404).json({
        success: false,
        message: `Appliance not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: appliance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update appliance',
      error: error.message,
    });
  }
};

// @desc    Delete appliance
// @route   DELETE /api/appliances/:id
// @access  Public
export const deleteAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.findByIdAndDelete(req.params.id);

    if (!appliance) {
      return res.status(404).json({
        success: false,
        message: `Appliance not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appliance removed successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete appliance',
      error: error.message,
    });
  }
};
