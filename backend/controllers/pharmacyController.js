import Pharmacy from '../models/Pharmacy.js';

// @desc    Create pharmacy
// @route   POST /api/pharmacy
// @access  Private (PHARMACY_OWNER only)
export const createPharmacy = async (req, res) => {
  try {
    const { pharmacyName, address, contactNumber, location } = req.body;

    // Check if pharmacy already exists for this owner
    const existingPharmacy = await Pharmacy.findOne({ owner: req.user._id });
    if (existingPharmacy) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pharmacy registered',
      });
    }

    // Create pharmacy
    const pharmacy = await Pharmacy.create({
      owner: req.user._id,
      pharmacyName,
      address,
      contactNumber,
      location,
    });

    res.status(201).json({
      success: true,
      data: pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get pharmacy by owner
// @route   GET /api/pharmacy/my-pharmacy
// @access  Private (PHARMACY_OWNER only)
export const getMyPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({ owner: req.user._id }).populate('owner', 'name email');

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy not found',
      });
    }

    res.status(200).json({
      success: true,
      data: pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update pharmacy
// @route   PUT /api/pharmacy/:id
// @access  Private (PHARMACY_OWNER only)
export const updatePharmacy = async (req, res) => {
  try {
    let pharmacy = await Pharmacy.findById(req.params.id);

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy not found',
      });
    }

    // Check if user owns the pharmacy
    if (pharmacy.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this pharmacy',
      });
    }

    // Update pharmacy
    pharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all pharmacies
// @route   GET /api/pharmacy
// @access  Public
export const getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().populate('owner', 'name email');

    res.status(200).json({
      success: true,
      count: pharmacies.length,
      data: pharmacies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
