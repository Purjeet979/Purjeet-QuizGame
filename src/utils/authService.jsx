import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const api = axios.create({
    baseURL: "http://localhost:9192/api/auth"
});

// In authService.jsx

export const registerUser = async (registration) => {
    try {
        // The backend now just returns a success message, no token.
        const response = await api.post("/register", registration);
        return response.data;
    } catch (error) {
        console.error("Error registering user: ", error);
        throw error;
    }
};

export const loginUser = async (login) => {
    try {
        const response = await api.post("/login", login);
        if (response.data.token) {
            localStorage.setItem("user-token", response.data.token);
            const decodedToken = jwtDecode(response.data.token);
            localStorage.setItem("user-roles", JSON.stringify(decodedToken.roles));
            localStorage.setItem("username", decodedToken.sub); // <-- ADD THIS LINE
        }
        return response.data;
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-roles");
    localStorage.removeItem("username");
};

export const isUserLoggedIn = () => {
    const token = localStorage.getItem("user-token");
    return !!token; // Returns true if token exists, false otherwise
};

export const getUserRoles = () => {
    const roles = localStorage.getItem("user-roles");
    if (roles) {
        try {
            // Only parse if roles is a valid string
            return JSON.parse(roles);
        } catch (error) {
            // Handle cases where data might be corrupted
            console.error("Error parsing user roles from localStorage", error);
            return [];
        }
    }
    // Return an empty array if no roles are found
    return [];
};

export const getToken = () => {
    return localStorage.getItem("user-token");
};

export const getUsername = () => {
    return localStorage.getItem("username");
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post(`/forgot-password?email=${email}`);
        return response.data;
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post(`/reset-password?token=${token}&newPassword=${newPassword}`);
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};