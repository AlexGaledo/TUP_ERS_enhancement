import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://tup-ers-enhancement-maux.onrender.com';

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
});

export default axiosInstance;