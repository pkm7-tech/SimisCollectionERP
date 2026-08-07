import api from "../api/axiosConfig";

export const getDashboardSummary = async () => {

    const response = await api.get("/dashboard/summary");

    return response.data;

};