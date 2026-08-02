import { useEffect, useState } from "react";

import {
    Typography,
    Paper,
    Button,
    Box,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
    getProducts,
    createProduct,
} from "../../services/productService";

import ProductDialog from "../../components/ui/ProductDialog";

function ProductPage() {

    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleSave = async (product) => {

        try {

            await createProduct(product);

            setOpenDialog(false);

            loadProducts();

        } catch (error) {

            console.error(error);

            alert("Unable to save product.");

        }

    };

    const columns = [

        {
            field: "id",
            headerName: "ID",
            width: 80,
        },

        {
            field: "name",
            headerName: "Product",
            flex: 1,
        },

        {
            field: "categoryName",
            headerName: "Category",
            flex: 1,
        },

        {
            field: "price",
            headerName: "Price",
            width: 120,
        },

        {
            field: "description",
            headerName: "Description",
            flex: 2,
        },

        {
            field: "active",
            headerName: "Status",
            width: 120,
            valueGetter: (value) =>
                value ? "Active" : "Inactive",
        },

    ];

    return (

        <div>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Typography variant="h4">

                    Product Management

                </Typography>

                <Button
                    variant="contained"
                    onClick={() => setOpenDialog(true)}
                >
                    Add Product
                </Button>

            </Box>

            <Paper sx={{ height: 500 }}>

                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                />

            </Paper>

            <ProductDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSave}
            />

        </div>

    );

}

export default ProductPage;