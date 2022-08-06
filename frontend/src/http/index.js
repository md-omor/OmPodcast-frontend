import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5500",
//   headers: {
//     "Content-type": "application/json",
//     Accept: "application/json",
//   },
// });

// console.log(api);

// // console.log(process.env.FORNTEND_API_URL);

// // List of all the endpoints
// export const sendOtp = (data) => api.post(`/api/send-otp`, data);

// export default api;

export const sendOtp = (data) => axios.post(`/api/send-otp`, data);
export const verifyOtp = (data) => axios.post(`/api/verify-otp`, data);
export const activate = (data) => axios.post(`/api/activate`, data);
