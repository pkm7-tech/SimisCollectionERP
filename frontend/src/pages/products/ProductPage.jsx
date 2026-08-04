import { useEffect, useState } from "react";

import {
    Typography,
    Paper,
    Button,
    Box,
    Snackbar,
    Alert,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";

import ProductDialog from "../../components/ui/ProductDialog";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/productService";

function ProductPage() {

    const [products, setProducts] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [productToDelete, setProductToDelete] = useState(null);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load products.");

        }

    };

    const handleAdd = () => {

        setSelectedProduct(null);

        setOpenDialog(true);

    };

    const handleEdit = (product) => {

        setSelectedProduct(product);

        setOpenDialog(true);

    };

    const handleSave = async (product) => {

        try {

            const request = {

                name: product.name,

                description: product.description,

                price: Number(product.price),

                categoryId: Number(product.categoryId),

            };

            if (selectedProduct) {

                await updateProduct(selectedProduct.id, request);

                setMessage("Product updated successfully!");

            }

            else {

                await createProduct(request);

                setMessage("Product saved successfully!");

            }

            setOpenDialog(false);

            setSuccess(true);

            loadProducts();

        }

        catch (error) {

            console.error(error);

            alert("Unable to save product.");

        }

    };

    const handleDeleteClick = (product) => {

        setProductToDelete(product);

        setDeleteDialog(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteProduct(productToDelete.id);

            setDeleteDialog(false);

            setMessage("Product deleted successfully!");

            setSuccess(true);

            loadProducts();

        }

        catch (error) {

            console.error(error);

            const message =
                error.response?.data?.message ||
                "Unable to delete product.";

            alert(message);

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
            valueGetter: (params) =>
                params ? "Active" : "Inactive",
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,

            renderCell: (params) => (

                <>

                    <IconButton
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(params.row)}
                    >
                        <DeleteIcon />
                    </IconButton>

                </>

            ),

        },

    ];

    return (

        <>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Typography
                    variant="h4"
                >
                    Product Management
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleAdd}
                >
                    Add Product
                </Button>

            </Box>

            <Paper sx={{ height: 600 }}>

                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSizeOptions={[5,10,20]}
                    initialState={{
                        pagination:{
                            paginationModel:{
                                pageSize:10,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />

            </Paper>

            <ProductDialog

                open={openDialog}

                onClose={() => {

                    setOpenDialog(false);

                    setSelectedProduct(null);

                }}

                onSave={handleSave}

                product={selectedProduct}

            />
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >

                <DialogTitle>

                    Delete Product

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this product?

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setDeleteDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>

                </DialogActions>

            </Dialog>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >

                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccess(false)}
                >

                    {message}

                </Alert>

            </Snackbar>

        </>

    );

}

export default ProductPage;