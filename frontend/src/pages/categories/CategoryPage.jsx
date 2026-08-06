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

import { DataGrid } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CategoryDialog from "../../components/ui/CategoryDialog";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categoryService";

function CategoryPage() {

    const [categories, setCategories] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load categories.");

        }

    };
    const handleAdd = () => {

        setSelectedCategory(null);

        setOpenDialog(true);

    };

    const handleEdit = (category) => {

        setSelectedCategory(category);

        setOpenDialog(true);

    };

    const handleSave = async (category) => {

        try {

            if (selectedCategory) {

                await updateCategory(selectedCategory.id, category);

                setMessage("Category updated successfully!");

            }

            else {

                await createCategory(category);

                setMessage("Category saved successfully!");

            }

            setOpenDialog(false);

            setSuccess(true);

            await loadCategories();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save category."
            );

        }

    };

    const handleDeleteClick = (category) => {

        setCategoryToDelete(category);

        setDeleteDialog(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteCategory(categoryToDelete.id);

            setDeleteDialog(false);

            setMessage("Category deleted successfully!");

            setSuccess(true);

            await loadCategories();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete category."
            );

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
            headerName: "Category",
            flex: 1,
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

                <Typography variant="h4">

                    Category Management

                </Typography>

                <Button
                    variant="contained"
                    onClick={handleAdd}
                >

                    Add Category

                </Button>

            </Box>

            <Paper sx={{ height: 600 }}>

                <DataGrid
                    rows={categories}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />

            </Paper>

            <CategoryDialog

                open={openDialog}

                onClose={() => {

                    setOpenDialog(false);

                    setSelectedCategory(null);

                }}

                onSave={handleSave}

                category={selectedCategory}

            />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >

                <DialogTitle>

                    Delete Category

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this category?

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

export default CategoryPage;