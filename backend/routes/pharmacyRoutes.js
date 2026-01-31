import express from 'express';
import {
  createPharmacy,
  getMyPharmacy,
  updatePharmacy,
  getAllPharmacies,
} from '../controllers/pharmacyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPharmacies);

// Protected routes (PHARMACY_OWNER only)
router.post('/', protect, authorize('PHARMACY_OWNER'), createPharmacy);
router.get('/my-pharmacy', protect, authorize('PHARMACY_OWNER'), getMyPharmacy);
router.put('/:id', protect, authorize('PHARMACY_OWNER'), updatePharmacy);

export default router;
