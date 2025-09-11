import axios from "axios";

 
const Url = 'https://restcountries.com/v3.1/';
 
const axiosInstance = axios.create({
  baseURL: Url,
});

// Do NOT set global credentials for all requests to avoid CORS issues on third‑party APIs
// axios.defaults.withCredentials = true;

export default axiosInstance;
export const apiUrl = Url;
