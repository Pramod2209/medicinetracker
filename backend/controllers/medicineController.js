import Medicine from '../models/Medicine.js';
import Pharmacy from '../models/Pharmacy.js';

// @desc    Add medicine
// @route   POST /api/medicine
// @access  Private (PHARMACY_OWNER only)
export const addMedicine = async (req, res) => {
  try {
    // Get pharmacy for the owner
    const pharmacy = await Pharmacy.findOne({ owner: req.user._id });

    if (!pharmacy) {
      return res.status(400).json({
        success: false,
        message: 'Please create a pharmacy first',
      });
    }

    // Create medicine with pharmacy reference
    const medicine = await Medicine.create({
      ...req.body,
      pharmacy: pharmacy._id,
    });

    res.status(201).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get medicines for pharmacy owner
// @route   GET /api/medicine/my-medicines
// @access  Private (PHARMACY_OWNER only)
export const getMyMedicines = async (req, res) => {
  try {
    // Get pharmacy for the owner
    const pharmacy = await Pharmacy.findOne({ owner: req.user._id });

    if (!pharmacy) {
      return res.status(400).json({
        success: false,
        message: 'Please create a pharmacy first',
      });
    }

    // Get medicines for the pharmacy
    const medicines = await Medicine.find({ pharmacy: pharmacy._id })
      .populate('pharmacy', 'pharmacyName address contactNumber location')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update medicine
// @route   PUT /api/medicine/:id
// @access  Private (PHARMACY_OWNER only)
export const updateMedicine = async (req, res) => {
  try {
    let medicine = await Medicine.findById(req.params.id).populate('pharmacy');

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found',
      });
    }

    // Check if user owns the pharmacy
    if (medicine.pharmacy.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this medicine',
      });
    }

    // Update medicine
    medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('pharmacy', 'pharmacyName address contactNumber location');

    res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete medicine
// @route   DELETE /api/medicine/:id
// @access  Private (PHARMACY_OWNER only)
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate('pharmacy');

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found',
      });
    }

    // Check if user owns the pharmacy
    if (medicine.pharmacy.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this medicine',
      });
    }

    await Medicine.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Medicine deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search medicines (for clients)
// @route   GET /api/medicine/search
// @access  Public
export const searchMedicines = async (req, res) => {
  try {
    const { name, category, city, pincode } = req.query;

    // Build query
    let query = { quantityAvailable: { $gt: 0 } };

    // Search by medicine name (case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Get medicines
    let medicines = await Medicine.find(query)
      .populate({
        path: 'pharmacy',
        select: 'pharmacyName address contactNumber location',
      })
      .sort('-lastUpdated');

    // Filter by location if provided
    if (city) {
      medicines = medicines.filter(med => 
        med.pharmacy.location.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (pincode) {
      medicines = medicines.filter(med => 
        med.pharmacy.location.pincode === pincode
      );
    }

    res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get medicine by ID
// @route   GET /api/medicine/:id
// @access  Public
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)
      .populate('pharmacy', 'pharmacyName address contactNumber location');

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found',
      });
    }

    res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
