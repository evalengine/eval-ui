import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EVAL_ENGINE_BENCHMARK_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors
instance.interceptors.request.use(
  (config) => {
    config.headers["X-API-Key"] = "chromia11111";
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
