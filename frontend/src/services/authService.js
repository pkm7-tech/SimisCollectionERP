import api from "../api/axiosConfig";

export const login = async (username, password) => {

    // Remove any old token before attempting login
    localStorage.removeItem("token");

    const response = await api.post("/auth/login", {
        username,
        password,
    });

    // Save the new token
    localStorage.setItem("token", response.data.token);

    return response.data;
};