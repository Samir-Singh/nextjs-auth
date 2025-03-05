import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    app_id: 20,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage?.getItem("authToken");

  if (!config.headers["Skip-Auth"] && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  delete config.headers["Skip-Auth"];

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      localStorage?.removeItem("authToken");
      window.location.href = "/";
    } else {
      return Promise.reject(
        error?.response?.data?.data[0] ||
          "Something went wrong, please try again."
      );
    }
  }
);

export default api;
