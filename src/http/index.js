import axios from "axios";

const base_url = "http://localhost:5500";

const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
// export default api;

export const sendOtp = (data) => axios.post(`/api/send-otp`, data);
export const verifyOtp = (data) => axios.post(`/api/verify-otp`, data);
export const activate = (data) => axios.post(`/api/activate`, data);
export const logout = () => axios.post(`/api/logout`);
export const createRoom = (data) => axios.post(`/api/rooms`, data);
export const getAllRooms = () => axios.get(`/api/rooms`);
export const getRoom = (roomId) => axios.get(`/api/rooms/${roomId}`);

// Interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${base_url}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);
