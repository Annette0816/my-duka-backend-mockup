import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/common/Layout';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import InventoryList from './components/inventory/InventoryList';
import InventoryForm from './components/inventory/InventoryForm';
import SupplyRequestList from './components/inventory/SupplyRequestList';
import Reports from './components/reports/Reports';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

// Auth wrapper component
const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthWrapper>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inventory" element={<InventoryList />} />
                  <Route path="/inventory/new" element={<InventoryForm />} />
                  <Route path="/inventory/:id/edit" element={<InventoryForm />} />
                  <Route path="/supply-requests" element={<SupplyRequestList />} />
                  <Route path="/reports" element={<Reports />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </AuthWrapper>
      </Router>
    </Provider>
  );
}

export default App;
