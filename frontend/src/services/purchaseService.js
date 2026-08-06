import api from "../api/axiosConfig";

export const getPurchases = async () => {
    const response = await api.get("/purchases");
    return response.data;
};

export const createPurchase = async (purchase) => {
    const response = await api.post("/purchases", purchase);
    return response.data;
};

export const getPurchaseById = async (id) => {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
};

export const deletePurchase = async (id) => {
    await api.delete(`/purchases/${id}`);
};