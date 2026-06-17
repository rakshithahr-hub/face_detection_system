import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import Login from './pages/Login'; // ✅ NEW
import ProtectedRoute from './components/ProtectedRoute'; // ✅ NEW

// Wrapper component
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Hide navbar on login page */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        {/* 🔓 Public route */}
        <Route path="/" element={<Login />} />

        {/* 🔒 Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;