import { useEffect, useMemo, useState } from "react";

import {
    Paper,
    Typography,
    TextField,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { getProductsWithStock }
    from "../../services/inventoryService";

function InventoryPage() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        try {

            const data =
                await getProductsWithStock();

            setProducts(data);

        }

        catch (error) {

            console.error(error);

        }

    };
    const filteredProducts = useMemo(() => {

        return products.filter(product =>

            product.productName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [products, search]);

    const rows = filteredProducts.map(product => ({

        id: product.productId,

        productName: product.productName,

        averagePurchasePrice: Number(
            product.averagePurchasePrice
        ),

        currentStock: product.currentStock,

        inventoryValue:

            Number(product.averagePurchasePrice) *

            Number(product.currentStock),

    }));

    const columns = [

        {
            field: "productName",
            headerName: "Product",
            flex: 2,
        },

        {
            field: "averagePurchasePrice",
            headerName: "Average Purchase Price",
            flex: 1.5,
            type: "number",
            valueFormatter: (params) =>
                `₹ ${Number(params).toFixed(2)}`,
        },

        {
            field: "currentStock",
            headerName: "Current Stock",
            flex: 1,
            type: "number",
        },

        {
            field: "inventoryValue",
            headerName: "Inventory Value",
            flex: 1.5,
            type: "number",
            valueFormatter: (params) =>
                `₹ ${Number(params).toFixed(2)}`,
        },

    ];
    return (

        <Paper
            sx={{
                p: 3,
                m: 3,
            }}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                Inventory Management
            </Typography>

            <TextField
                fullWidth
                label="Search Product"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                sx={{
                    mb: 3,
                }}
            />

            <div
                style={{
                    height: 600,
                    width: "100%",
                }}
            >

                <DataGrid

                    rows={rows}

                    columns={columns}

                    pageSizeOptions={[10, 20, 50]}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}

                    disableRowSelectionOnClick

                />

            </div>

        </Paper>

    );

}

export default InventoryPage;