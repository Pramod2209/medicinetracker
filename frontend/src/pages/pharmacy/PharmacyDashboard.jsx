import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { getMyPharmacy, createPharmacy } from '../../services/pharmacyService';
import { getMyMedicines, addMedicine, updateMedicine, deleteMedicine } from '../../services/medicineService';
import { Plus, Edit2, Trash2, Building2, Package, X } from 'lucide-react';
import toast from 'react-hot-toast';

const PharmacyDashboard = () => {
  const [pharmacy, setPharmacy] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPharmacyForm, setShowPharmacyForm] = useState(false);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: '',
    address: '',
    contactNumber: '',
    location: { city: '', pincode: '' },
  });

  const [medicineData, setMedicineData] = useState({
    name: '',
    brand: '',
    category: 'Tablet',
    price: '',
    quantityAvailable: '',
    expiryDate: '',
  });

  const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Other'];

  const fetchData = async () => {
    setLoading(true);
    try {
      const pharmacyData = await getMyPharmacy();
      setPharmacy(pharmacyData.data);
      
      const medicinesData = await getMyMedicines();
      setMedicines(medicinesData.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setShowPharmacyForm(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePharmacy = async (e) => {
    e.preventDefault();
    try {
      await createPharmacy(pharmacyData);
      toast.success('Pharmacy created successfully!');
      setShowPharmacyForm(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create pharmacy');
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      if (editingMedicine) {
        await updateMedicine(editingMedicine._id, medicineData);
        toast.success('Medicine updated successfully!');
      } else {
        await addMedicine(medicineData);
        toast.success('Medicine added successfully!');
      }
      setShowMedicineForm(false);
      setEditingMedicine(null);
      resetMedicineForm();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setMedicineData({
      name: medicine.name,
      brand: medicine.brand,
      category: medicine.category,
      price: medicine.price,
      quantityAvailable: medicine.quantityAvailable,
      expiryDate: medicine.expiryDate.split('T')[0],
    });
    setShowMedicineForm(true);
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        toast.success('Medicine deleted successfully!');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete medicine');
      }
    }
  };

  const resetMedicineForm = () => {
    setMedicineData({
      name: '',
      brand: '',
      category: 'Tablet',
      price: '',
      quantityAvailable: '',
      expiryDate: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Pharmacy Setup Form
  if (showPharmacyForm) {
    return (
      <div className="min-h-screen bg-gray-50 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/photos/dash.avif')", backgroundBlendMode: "overlay" }}>
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-primary-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Your Pharmacy Profile
                </h2>
                <p className="text-gray-600 text-sm">
                  Set up your pharmacy to start managing medicines
                </p>
              </div>
            </div>

            <form onSubmit={handleCreatePharmacy} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pharmacy Name *
                </label>
                <input
                  type="text"
                  value={pharmacyData.pharmacyName}
                  onChange={(e) => setPharmacyData({ ...pharmacyData, pharmacyName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  value={pharmacyData.address}
                  onChange={(e) => setPharmacyData({ ...pharmacyData, address: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={pharmacyData.contactNumber}
                  onChange={(e) => setPharmacyData({ ...pharmacyData, contactNumber: e.target.value })}
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={pharmacyData.location.city}
                    onChange={(e) => setPharmacyData({
                      ...pharmacyData,
                      location: { ...pharmacyData.location, city: e.target.value }
                    })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={pharmacyData.location.pincode}
                    onChange={(e) => setPharmacyData({
                      ...pharmacyData,
                      location: { ...pharmacyData.location, pincode: e.target.value }
                    })}
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Create Pharmacy
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/photos/dash.avif')", backgroundBlendMode: "overlay" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pharmacy Info */}
        {pharmacy && (
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-6 mb-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{pharmacy.pharmacyName}</h2>
                  <p className="text-primary-100 mb-1">{pharmacy.address}</p>
                  <p className="text-primary-100">
                    {pharmacy.location.city}, {pharmacy.location.pincode} • {pharmacy.contactNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medicines Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Medicine Inventory
              </h3>
            </div>
            <button
              onClick={() => {
                setEditingMedicine(null);
                resetMedicineForm();
                setShowMedicineForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Medicine
            </button>
          </div>

          {medicines.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No medicines added yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Click "Add Medicine" to start building your inventory
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Medicine
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Expiry Date
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine) => (
                    <tr key={medicine._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-500">{medicine.brand}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded">
                          {medicine.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">₹{medicine.price}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${medicine.quantityAvailable > 10 ? 'text-medical-600' : 'text-red-600'}`}>
                          {medicine.quantityAvailable}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(medicine.expiryDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditMedicine(medicine)}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(medicine._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Medicine Form Modal */}
      {showMedicineForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h3>
              <button
                onClick={() => {
                  setShowMedicineForm(false);
                  setEditingMedicine(null);
                  resetMedicineForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddMedicine} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    value={medicineData.name}
                    onChange={(e) => setMedicineData({ ...medicineData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={medicineData.brand}
                    onChange={(e) => setMedicineData({ ...medicineData, brand: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={medicineData.category}
                    onChange={(e) => setMedicineData({ ...medicineData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={medicineData.price}
                    onChange={(e) => setMedicineData({ ...medicineData, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity Available *
                  </label>
                  <input
                    type="number"
                    value={medicineData.quantityAvailable}
                    onChange={(e) => setMedicineData({ ...medicineData, quantityAvailable: e.target.value })}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={medicineData.expiryDate}
                    onChange={(e) => setMedicineData({ ...medicineData, expiryDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowMedicineForm(false);
                    setEditingMedicine(null);
                    resetMedicineForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyDashboard;
