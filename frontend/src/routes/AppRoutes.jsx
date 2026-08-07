import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import CategoryPage from "../pages/categories/CategoryPage";
import ProductPage from "../pages/products/ProductPage";
import CustomerPage from "../pages/customers/CustomerPage";
import SupplierPage from "../pages/suppliers/SupplierPage";
import PurchasePage from "../pages/purchases/PurchasePage";
import SalePage from "../pages/sales/SalePage";
import UserPage from "../pages/users/UserPage";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/customers" element={<CustomerPage />} />
                    <Route path="/suppliers" element={<SupplierPage />} />
                    <Route path="/purchases" element={<PurchasePage />} />
                    <Route path="/sales" element={<SalePage />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route
                        path="/inventory"
                        element={<InventoryPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;