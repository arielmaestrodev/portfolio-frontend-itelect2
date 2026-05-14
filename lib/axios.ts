import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true, // Crucial for HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor for Token Rotation
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // --- Centralized Error Logging ---
    // Suppress console.error for expected client-side errors (400-499)
    if (!status || status >= 500) {
      console.error(`[API System Error] ${originalRequest.method?.toUpperCase()} ${originalRequest.url}:`, {
        status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // --- Token Rotation Logic ---
    // If error is 401 and we haven't retried yet
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        // Backend handles cookies automatically with withCredentials: true
        await axios.post(`${backendURL}/api/auth/v1/refresh-token`, {}, { withCredentials: true });
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear local data and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;