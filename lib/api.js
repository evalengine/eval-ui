import axios from "axios";
import Router from "next/router";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:8010/proxy"
    : "https://api.evaengine.ai",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors
instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      "X-API-Key": localStorage.getItem("apiKey"),
    };

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
      case 500:
        break;
      case 404:
        break;
      case 502:
        Router.push("/502");
        break;
      default:
    }

    return Promise.reject(response.data);
  }
);

export default instance;
