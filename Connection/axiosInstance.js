import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://obsoa-backend-main.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto attach token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;