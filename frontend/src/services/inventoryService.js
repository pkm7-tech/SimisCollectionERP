import api from "../api/axiosConfig";

export const getProductsWithStock = async () => {

    const response = await api.get("/inventory/products");

    return response.data;

};