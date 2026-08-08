import api from "../api/axiosConfig";

export const getDashboardSummary = async () => {
    const response = await api.get("/dashboard/summary");
    return response.data;
};

export const getMonthlySales = async () => {
    const response = await api.get("/dashboard/monthly-sales");
    return response.data;
};

export const getMonthlyPurchases = async () => {
    const response = await api.get("/dashboard/monthly-purchases");
    return response.data;
};