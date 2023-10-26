import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) return response.data;
    return response;
  },
  (error) => ({ error: error.response })
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!config?.headers?.["Authorization"] && token) {
      config.headers["Authorization"] = `Barrier ${token}`;
    }

    return config;
  },
  (error) => ({ error: error.response })
);

export default axiosInstance;
