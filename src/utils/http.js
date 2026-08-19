import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

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
  // ✅ Thêm: check refresh_token hợp lệ trước khi gọi API
  const refresh_token = localStorage.getItem("refreshToken");
  if (
    !refresh_token ||
    refresh_token === "undefined" ||
    refresh_token === "null"
  ) {
    processQueue(new Error("No valid refresh token"));
    throw new Error("No valid refresh token");
  }

  try {
    const result = await axios.post(`${baseURL}/auth/refresh`, {
      refresh_token,
    });

    // ✅ Thêm: validate token trả về trước khi lưu
    const tokens = result.data?.data;
    if (!tokens?.access_token || !tokens?.refresh_token) {
      throw new Error("Invalid refresh response");
    }

    localStorage.setItem("accessToken", tokens.access_token);
    localStorage.setItem("refreshToken", tokens.refresh_token);
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
      // ✅ Thêm: dùng finally để đảm bảo isRefreshing luôn được reset dù thành công hay lỗi
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

    // guard nếu originalRequest không tồn tại
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // loại trừ auth endpoints khỏi luồng refresh
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
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

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

const http = { get, post, put, patch, del };

export default http;
