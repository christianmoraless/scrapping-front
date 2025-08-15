// src/api/config.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const apiConfig = {
    baseURL: API_BASE_URL,
    headers: defaultHeaders,
    timeout: 10000,
    withCredentials: true
};