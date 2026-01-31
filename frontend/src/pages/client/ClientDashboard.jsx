import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { searchMedicines } from '../../services/medicineService';
import { Search, MapPin, Filter, Pill, Building2, Phone, IndianRupee, ShoppingBag, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const ClientDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    category: 'All',
    city: '',
    pincode: '',
  });

  const categories = ['All', 'Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Other'];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.name) params.name = filters.name;
      if (filters.category !== 'All') params.category = filters.category;
      if (filters.city) params.city = filters.city;
      if (filters.pincode) params.pincode = filters.pincode;

      const data = await searchMedicines(params);
      setMedicines(data.data);
    } catch (error) {
      toast.error('Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/photos/dash.avif')", backgroundBlendMode: "overlay" }}>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-400 to-cyan-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">
                PHARMACY
              </h1>
              <p className="text-2xl text-teal-100 mb-6">Medicine Finder</p>
              <p className="text-white/90 text-lg mb-8">
                Search and discover medicines available at pharmacies near you. 
                Find the best prices, check availability, and locate nearby pharmacies 
                with just a few clicks.
              </p>
              
              {/* Quick Search */}
              <div className="bg-white rounded-full shadow-lg p-2 flex items-center max-w-md">
                <input
                  type="text"
                  placeholder="Search for medicines..."
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-2 rounded-full focus:outline-none text-gray-700"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative">
                <img 
                  src="https://us.123rf.com/450wm/anastasiatukaeva/anastasiatukaeva1701/anastasiatukaeva170100013/69193807-the-pharmacy-building-front-shop-street-building-a-local-pharmacy-medicine-retail-shop-facade.jpg?ver=6"
                  alt="Pharmacy Building"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-teal-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-teal-500" />
            Advanced Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  placeholder="Enter city..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={filters.pincode}
                onChange={handleFilterChange}
                placeholder="Enter pincode..."
                maxLength={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : medicines.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-teal-100">
            <div className="bg-teal-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pill className="w-12 h-12 text-teal-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No medicines found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search filters or search for different medicines
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Available Medicines ({medicines.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicines.map((medicine) => (
                <div
                  key={medicine._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:border-teal-200"
                >
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {medicine.name}
                        </h3>
                        <p className="text-teal-50 text-sm">{medicine.brand}</p>
                      </div>
                      <span className="bg-white text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {medicine.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-gray-700" />
                          <p className="text-xl font-bold text-gray-900">
                            {medicine.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">In Stock</p>
                        <p className={`text-xl font-bold ${medicine.quantityAvailable > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                          {medicine.quantityAvailable}
                        </p>
                      </div>
                    </div>

                    {/* Pharmacy Info */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {medicine.pharmacy.pharmacyName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {medicine.pharmacy.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          {medicine.pharmacy.contactNumber}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          {medicine.pharmacy.location.city}, {medicine.pharmacy.location.pincode}
                        </p>
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          Expires: <span className="font-medium text-gray-700">{formatDate(medicine.expiryDate)}</span>
                        </p>
                        <button className="text-teal-600 hover:text-teal-700 text-xs font-medium flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Results Count */}
        {!loading && medicines.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-teal-600">{medicines.length}</span> {medicines.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
