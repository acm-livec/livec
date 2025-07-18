import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false, // Set to True at production level
});

