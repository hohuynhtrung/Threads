import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const httpClient = axios.create({
  baseURL,
});

// Automatically attach the access token to every request
httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

// Automatically refresh token on 401 error
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refreshToken");
  if (!refresh_token) {
    processQueue(new Error("No refresh token"));
    throw new Error("No refresh token");
  }
  try {
    const result = await axios.post(`${baseURL}/auth/refresh`, {
      refresh_token: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", result.data.access_token);
    localStorage.setItem("refreshToken", result.data.refresh_token);
    processQueue(null);
  } catch (error) {
    processQueue(error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

const getNewToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      await refreshToken();
    } finally {
      isRefreshing = false;
    }
    return;
  }

  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  });
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");

    const shouldRenewToken =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint;

    if (shouldRenewToken) {
      originalRequest._retry = true;

      try {
        await getNewToken();
        return httpClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

//API utility functions
const _send = async (method, path, data, config) => {
  const response = await httpClient.request({
    ...config,
    method,
    url: path,
    data,
  });
  return response.data;
};

const get = async (path, config) => {
  return await _send("get", path, null, config);
};

const post = async (path, data, config) => {
  return await _send("post", path, data, config);
};

const put = async (path, data, config) => {
  return await _send("put", path, data, config);
};

const patch = async (path, data, config) => {
  return await _send("patch", path, data, config);
};

const del = async (path, config) => {
  return await _send("delete", path, null, config);
};

const http = { get, post, put, patch, del };

export default http;
