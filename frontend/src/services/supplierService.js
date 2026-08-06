import api from "../api/axiosConfig";

export const getSuppliers = async () => {
    const response = await api.get("/suppliers");
    return response.data;
};

export const createSupplier = async (supplier) => {
    const response = await api.post("/suppliers", supplier);
    return response.data;
};

export const updateSupplier = async (id, supplier) => {
    const response = await api.put(`/suppliers/${id}`, supplier);
    return response.data;
};

export const deleteSupplier = async (id) => {
    await api.delete(`/suppliers/${id}`);
};