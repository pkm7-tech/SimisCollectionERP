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

import SupplierDialog from "../../components/ui/SupplierDialog";

import {
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "../../services/supplierService";

function SupplierPage() {

    const [suppliers, setSuppliers] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [supplierToDelete, setSupplierToDelete] = useState(null);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadSuppliers();

    }, []);

    const loadSuppliers = async () => {

        try {

            const data = await getSuppliers();

            setSuppliers(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load suppliers.");

        }

    };
    const handleAdd = () => {

        setSelectedSupplier(null);

        setOpenDialog(true);

    };

    const handleEdit = (supplier) => {

        setSelectedSupplier(supplier);

        setOpenDialog(true);

    };

    const handleSave = async (supplier) => {

        try {

            if (selectedSupplier) {

                await updateSupplier(selectedSupplier.id, supplier);

                setMessage("Supplier updated successfully!");

            } else {

                await createSupplier(supplier);

                setMessage("Supplier added successfully!");

            }

            setOpenDialog(false);

            setSuccess(true);

            await loadSuppliers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save supplier."
            );

        }

    };

    const handleDeleteClick = (supplier) => {

        setSupplierToDelete(supplier);

        setDeleteDialog(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteSupplier(supplierToDelete.id);

            setDeleteDialog(false);

            setMessage("Supplier deleted successfully!");

            setSuccess(true);

            await loadSuppliers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete supplier."
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
            field: "companyName",
            headerName: "Company",
            flex: 1.5,
        },

        {
            field: "contactPerson",
            headerName: "Contact Person",
            flex: 1,
        },

        {
            field: "email",
            headerName: "Email",
            flex: 1.5,
        },

        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },

        {
            field: "address",
            headerName: "Address",
            flex: 2,
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

                    Supplier Management

                </Typography>

                <Button
                    variant="contained"
                    onClick={handleAdd}
                >

                    Add Supplier

                </Button>

            </Box>

            <Paper sx={{ height: 600 }}>

                <DataGrid
                    rows={suppliers}
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

            <SupplierDialog

                open={openDialog}

                onClose={() => {

                    setOpenDialog(false);

                    setSelectedSupplier(null);

                }}

                onSave={handleSave}

                supplier={selectedSupplier}

            />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >

                <DialogTitle>

                    Delete Supplier

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this supplier?

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

export default SupplierPage;