import api from './api';

// Create pharmacy
export const createPharmacy = async (pharmacyData) => {
  const response = await api.post('/pharmacy', pharmacyData);
  return response.data;
};

// Get my pharmacy
export const getMyPharmacy = async () => {
  const response = await api.get('/pharmacy/my-pharmacy');
  return response.data;
};

// Update pharmacy
export const updatePharmacy = async (id, pharmacyData) => {
  const response = await api.put(`/pharmacy/${id}`, pharmacyData);
  return response.data;
};

// Get all pharmacies
export const getAllPharmacies = async () => {
  const response = await api.get('/pharmacy');
  return response.data;
};
