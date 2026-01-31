import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One pharmacy per owner
  },
  pharmacyName: {
    type: String,
    required: [true, 'Please provide pharmacy name'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide contact number'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit contact number'],
  },
  location: {
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, 'Please provide pincode'],
      match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode'],
    },
  },
}, {
  timestamps: true,
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

export default Pharmacy;
