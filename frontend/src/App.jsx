import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={user ? (
            user.role === 'CLIENT' ? 
              <Navigate to="/client/dashboard" replace /> : 
              <Navigate to="/pharmacy/dashboard" replace />
          ) : (
            <Login />
          )} 
        />
        <Route 
          path="/register" 
          element={user ? (
            user.role === 'CLIENT' ? 
              <Navigate to="/client/dashboard" replace /> : 
              <Navigate to="/pharmacy/dashboard" replace />
          ) : (
            <Register />
          )} 
        />

        {/* Client Routes */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute requiredRole="CLIENT">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Pharmacy Owner Routes */}
        <Route
          path="/pharmacy/dashboard"
          element={
            <ProtectedRoute requiredRole="PHARMACY_OWNER">
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
