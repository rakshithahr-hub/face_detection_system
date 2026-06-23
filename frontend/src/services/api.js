// ================================
// API SERVICE
// ================================

const BASE_URL = "http://localhost:5000";

// Helper function to handle response errors
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  
  return data;
};

// ================================
// AUTHENTICATION API
// ================================

// ✅ User Registration
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ name, email, password })
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// ✅ User Login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ email, password })
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ================================
// PREDICTION API
// ================================

// ✅ Image Prediction (with JWT token)
export const predictImage = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }
    
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // ❌ Do NOT set Content-Type for FormData
        // Browser will set it automatically with boundary
      },
      body: formData  // ✅ Send FormData directly
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Prediction error:", error);
    throw error;
  }
};

// ================================
// UPLOAD API
// ================================

// ✅ Upload File
export const uploadFile = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }
    
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};