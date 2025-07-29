import axios from 'axios';

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://livec.epcc.hosting.acm.org",
    withCredentials: false, // Set to True at production level
});
