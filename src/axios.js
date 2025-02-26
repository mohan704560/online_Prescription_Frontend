import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


Axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default Axios;