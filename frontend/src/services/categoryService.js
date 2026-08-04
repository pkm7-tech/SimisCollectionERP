import api from "../api/axiosConfig";

export const getCategories = async () => {

    const response = await api.get("/categories");

    return response.data;

};