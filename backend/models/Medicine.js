import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide medicine name'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand name'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Other'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0,
  },
  quantityAvailable: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: 0,
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide expiry date'],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Update lastUpdated on every save
medicineSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Index for search optimization
medicineSchema.index({ name: 'text', brand: 'text' });

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
