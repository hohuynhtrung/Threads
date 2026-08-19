import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const httpClient = axios.create({
  baseURL,
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ============================================
// REFRESH TOKEN
// ============================================

let refreshPromise = null;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await axios.post(`${baseURL}/auth/refresh`, {
    refresh_token: refreshToken,
  });

  console.log("Refresh response:", response.data);

  const data = response.data.data;

  // API của bạn trả đúng cấu trúc:
  // data.access_token
  // data.refresh_token
  // data.expires_in

  localStorage.setItem("accessToken", data.access_token);

  if (data.refresh_token) {
    localStorage.setItem("refreshToken", data.refresh_token);
  }

  return data.access_token;
};

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    const is401 = error.response?.status === 401;

    if (!is401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");

    // Không có refresh token thì không refresh
    if (!refreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Nếu chưa có request refresh thì tạo một request
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      // Các request 401 khác sẽ chờ request refresh này
      const newAccessToken = await refreshPromise;

      // Gắn access token mới
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Gọi lại request cũ
      return httpClient(originalRequest);
    } catch (refreshError) {
      // Refresh token cũng hết hạn / invalid
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return Promise.reject(refreshError);
    }
  },
);

// ============================================
// HTTP METHODS
// ============================================

const _send = async (method, path, data, config) => {
  const response = await httpClient.request({
    ...config,
    method,
    url: path,
    data,
  });

  return response.data;
};

const get = async (path, config) => _send("get", path, null, config);

const post = async (path, data, config) => _send("post", path, data, config);

const put = async (path, data, config) => _send("put", path, data, config);

const patch = async (path, data, config) => _send("patch", path, data, config);

const del = async (path, config) => _send("delete", path, null, config);

const http = {
  get,
  post,
  put,
  patch,
  del,
};

export default http;
