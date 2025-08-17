// src/tokenService.js
export const getToken = () => {
    try {
        return localStorage.getItem('authToken');
    } catch (e) {
        console.error("Error getting token from localStorage", e);
        return null;
    }
};

export const setToken = (token) => {
    try {
        localStorage.setItem('authToken', token);
    } catch (e) {
        console.error("Error setting token to localStorage", e);
    }
};

export const removeToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {
        console.error("Error removing token from localStorage", e);
    }
};