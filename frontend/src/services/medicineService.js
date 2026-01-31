import api from './api';

// Search medicines
export const searchMedicines = async (params) => {
  const response = await api.get('/medicine/search', { params });
  return response.data;
};

// Add medicine
export const addMedicine = async (medicineData) => {
  const response = await api.post('/medicine', medicineData);
  return response.data;
};

// Get my medicines
export const getMyMedicines = async () => {
  const response = await api.get('/medicine/owner/my-medicines');
  return response.data;
};

// Update medicine
export const updateMedicine = async (id, medicineData) => {
  const response = await api.put(`/medicine/${id}`, medicineData);
  return response.data;
};

// Delete medicine
export const deleteMedicine = async (id) => {
  const response = await api.delete(`/medicine/${id}`);
  return response.data;
};

// Get medicine by ID
export const getMedicineById = async (id) => {
  const response = await api.get(`/medicine/${id}`);
  return response.data;
};
