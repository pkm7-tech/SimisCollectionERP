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

import CustomerDialog from "../../components/ui/CustomerDialog";

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../../services/customerService";

function CustomerPage() {

    const [customers, setCustomers] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [customerToDelete, setCustomerToDelete] = useState(null);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            const data = await getCustomers();

            setCustomers(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load customers.");

        }

    };
    const handleAdd = () => {

        setSelectedCustomer(null);

        setOpenDialog(true);

    };

    const handleEdit = (customer) => {

        setSelectedCustomer(customer);

        setOpenDialog(true);

    };

    const handleSave = async (customer) => {

        try {

            if (selectedCustomer) {

                await updateCustomer(selectedCustomer.id, customer);

                setMessage("Customer updated successfully!");

            } else {

                await createCustomer(customer);

                setMessage("Customer added successfully!");

            }

            setOpenDialog(false);

            setSuccess(true);

            await loadCustomers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save customer."
            );

        }

    };

    const handleDeleteClick = (customer) => {

        setCustomerToDelete(customer);

        setDeleteDialog(true);

    };

    const confirmDelete = async () => {

        try {

            await deleteCustomer(customerToDelete.id);

            setDeleteDialog(false);

            setMessage("Customer deleted successfully!");

            setSuccess(true);

            await loadCustomers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete customer."
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
            field: "firstName",
            headerName: "First Name",
            flex: 1,
        },

        {
            field: "lastName",
            headerName: "Last Name",
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

                    Customer Management

                </Typography>

                <Button
                    variant="contained"
                    onClick={handleAdd}
                >

                    Add Customer

                </Button>

            </Box>

            <Paper sx={{ height: 600 }}>

                <DataGrid
                    rows={customers}
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

            <CustomerDialog

                open={openDialog}

                onClose={() => {

                    setOpenDialog(false);

                    setSelectedCustomer(null);

                }}

                onSave={handleSave}

                customer={selectedCustomer}

            />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >

                <DialogTitle>

                    Delete Customer

                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete this customer?

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

export default CustomerPage;