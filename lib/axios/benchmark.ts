import axios from "axios";

const instance = axios.create({
  baseURL: "/api/benchmark",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors
instance.interceptors.request.use(
  (config) => {
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
