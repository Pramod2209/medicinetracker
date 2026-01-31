import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pill, LogIn } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('CLIENT');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ ...formData, role });
    
    if (result.success) {
      if (role === 'CLIENT') {
        navigate('/client/dashboard');
      } else {
        navigate('/pharmacy/dashboard');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Image Side */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500 p-12">
            <div className="text-center">
              <img 
                src={role === 'CLIENT' ? '/photos/client.webp' : 'https://media.istockphoto.com/id/1194515927/vector/cartoon-pharmacy-building-exterior-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=cGPfNd8z0pTSWt8vuvoGyu_1we7Y51T2LSyI_hEhAto='}
                alt={role === 'CLIENT' ? 'Medicine' : 'Pharmacy Building'} 
                className="w-full h-auto rounded-lg shadow-lg mb-6"
              />
              <h2 className="text-3xl font-bold text-white mb-2">
                Medicine Availability Tracker
              </h2>
              <p className="text-blue-50 text-lg">
                {role === 'CLIENT' ? 'Find medicines at nearby pharmacies instantly' : 'Manage your pharmacy and medicines'}
              </p>
            </div>
          </div>

          {/* Login Form Side */}
          <div className="p-8 md:p-12">
            {/* Logo and Title for mobile */}
            <div className="text-center mb-8 md:hidden">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-600 p-3 rounded-full">
                  <Pill className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Medicine Availability Tracker
              </h1>
              <p className="text-gray-600">Login to your account</p>
            </div>

            {/* Desktop Title */}
            <div className="hidden md:block text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-600 p-3 rounded-full">
                  <Pill className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Login to your account</p>
            </div>

            {/* Login Form */}
            <div>
              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login As
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('CLIENT')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      role === 'CLIENT'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('PHARMACY_OWNER')}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      role === 'PHARMACY_OWNER'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pharmacy Owner
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/register')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
