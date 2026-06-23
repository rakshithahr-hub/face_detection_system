// ================================
// AUTHENTICATION HELPERS
// ================================

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const loggedIn = localStorage.getItem("isLoggedIn");
  return !!(token && loggedIn === "true");
};

// ✅ Get current user details
export const getCurrentUser = () => {
  const email = localStorage.getItem("userEmail") || "";
  const name = localStorage.getItem("userName") || "";
  const userId = localStorage.getItem("userId") || "";
  return { email, name, userId };
};

// ✅ Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Set user data after login/registration
export const setUserData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userEmail", user?.email || "");
  localStorage.setItem("userName", user?.name || user?.username || "User");
  localStorage.setItem("userId", user?.id || user?.user_id || "");
  localStorage.setItem("isLoggedIn", "true");
};

// ✅ Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
  localStorage.removeItem("isLoggedIn");
};

// ✅ Clear all user data
export const clearUserData = () => {
  localStorage.clear();
};

// ✅ Get auth headers for API requests
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};