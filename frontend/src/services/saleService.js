import api from "../api/axiosConfig";

export const getSales = async () => {

    const response = await api.get("/sales");

    return response.data;

};

export const createSale = async (sale) => {

    const response = await api.post("/sales", sale);

    return response.data;

};

export const deleteSale = async (id) => {

    await api.delete(`/sales/${id}`);

};

export const getSaleHistory = async () => {

    const response = await api.get("/sales/history");

    return response.data;

};

export const getSaleById = async (id) => {

    const response = await api.get(`/sales/${id}`);

    return response.data;

};