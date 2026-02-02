import axios from "axios";

let getAccessTokenFn = null;

export const setAuthTokenProvider = (fn) => {
  getAccessTokenFn = fn;
};

const workshopClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

workshopClient.interceptors.request.use(async (config) => {
  if (!getAccessTokenFn) return config;

  const token = await getAccessTokenFn();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default workshopClient;
