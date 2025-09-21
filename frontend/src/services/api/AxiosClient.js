import axios from "axios";
import AppConfig from "../../config/AppConfig";
import queryString from "query-string";
import { toast } from "sonner";
import AppLogger from "../../utils/AppLogger";
// Reference: https://blog.logrocket.com/axios-javascript/

const axiosClient = axios.create({
  baseURL: AppConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 1000 * 60 * 1, // 1 minute
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    AppLogger.error("Error in request", error);
    toast.error("Something went wrong. Please try again later.");
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      AppLogger.info("response data", response.data);
      AppLogger.info("response url", response.request.responseURL);
      return response.data;
    }
    AppLogger.info("response", response);
    return response;
  },
  (error) => {
    AppLogger.error("Error in response", error);

    handleError(error);
    return Promise.reject(error);
  }
);

// Centralized error handling
const handleError = (error) => {
  const messages = {
    500: "Server error. Please try again later.",
  };
  const statusCode = error.response?.status || error.status || 500;

  let errorMessage = messages[statusCode] || "Something went wrong.";

  toast.error(errorMessage, {
    toasterId: "global",
  });
  AppLogger.error("Full error:", error);
};

export default axiosClient;
