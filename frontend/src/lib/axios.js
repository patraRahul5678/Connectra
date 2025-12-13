import axios from "axios";

const BASE_URL ="https://streamify-10.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});