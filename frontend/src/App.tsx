import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UpdatePassword from './components/UpdatePassword';
import AdminDashboard from './components/AdminDashboard';
import StoreList from './components/StoreList';
import StoreOwnerDashboard from './components/StoreOwnerDashboard';
import './App.css';

const App: React.FC = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactElement; allowedRoles: string[] }) => {
    if (!token || !role || !allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route
            path="/update-password"
            element={
              <ProtectedRoute allowedRoles={['USER', 'STORE_OWNER']}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stores"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <StoreList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store-owner"
            element={
              <ProtectedRoute allowedRoles={['STORE_OWNER']}>
                <StoreOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;