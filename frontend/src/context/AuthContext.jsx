import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { getCurrentUser, login as loginService, logout as logoutService, register as registerService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasCheckedAuth = useRef(false);

  // Check if user is logged in on mount
  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      setUser(data.data);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerService(userData);
      setUser(data.data);
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isClient: user?.role === 'CLIENT',
    isPharmacyOwner: user?.role === 'PHARMACY_OWNER',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
