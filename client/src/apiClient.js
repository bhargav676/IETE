// src/apiClient.js (NEW & FIXED)
import axios from 'axios';
import { getToken, removeToken } from './tokenService';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add JWT token to every outgoing request
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle common errors like 401 Unauthorized
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // If token is invalid or expired, or user is unauthorized
            removeToken(); // Clear invalid token
            window.location.href = '/admin/login'; // Redirect to login page
            alert('Your session has expired or is invalid. Please log in again.');
        }
        return Promise.reject(error);
    }
);

export default apiClient; // <--- CHANGE THIS LINE