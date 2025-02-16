import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_PROXY_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors
instance.interceptors.request.use(
  (config) => {
    config.headers["X-API-Key"] = localStorage.getItem("virtual-api-key");
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("virtual-jwt-token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const { response = {} } = error;

    switch (response.status) {
      case 401:
        break;
      default:
    }

    return Promise.reject(response.data);
  }
);

export default instance;
