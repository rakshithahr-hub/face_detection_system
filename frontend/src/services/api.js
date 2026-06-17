const BASE_URL = "http://localhost:5000";

// Helper function to handle response errors
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  
  return data;
};

// User Registration
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

// User Login
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

// Image Prediction (with JWT token)
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
      },
      body: formData // Don't set Content-Type for FormData, browser will set it with boundary
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Prediction error:", error);
    throw error;
  }
};

// Optional: Upload file endpoint (if you have it)
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

// Optional: Protected route example
export const getProtectedData = async () => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No authentication token found. Please login again.");
    }
    
    const response = await fetch(`${BASE_URL}/protected`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error;
  }
};

// Optional: Logout function (clear local storage)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  // Add any other user data you've stored
};

// Optional: Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
};

// Optional: Get auth headers for manual requests
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};