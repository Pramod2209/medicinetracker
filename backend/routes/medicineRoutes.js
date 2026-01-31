import express from 'express';
import {
  addMedicine,
  getMyMedicines,
  updateMedicine,
  deleteMedicine,
  searchMedicines,
  getMedicineById,
} from '../controllers/medicineController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/search', searchMedicines);
router.get('/:id', getMedicineById);

// Protected routes (PHARMACY_OWNER only)
router.post('/', protect, authorize('PHARMACY_OWNER'), addMedicine);
router.get('/owner/my-medicines', protect, authorize('PHARMACY_OWNER'), getMyMedicines);
router.put('/:id', protect, authorize('PHARMACY_OWNER'), updateMedicine);
router.delete('/:id', protect, authorize('PHARMACY_OWNER'), deleteMedicine);

export default router;
