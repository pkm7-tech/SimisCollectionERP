import { useEffect, useMemo, useState } from "react";

import {
    Paper,
    Grid,
    TextField,
    Button,
    MenuItem,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import SaleItemDialog from "../../components/ui/SaleItemDialog";

import { getCustomers } from "../../services/customerService";
import { createSale } from "../../services/saleService";

function SalePage() {

    const generateInvoiceNumber = () => {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1)
            .padStart(2, "0");

        const day = String(today.getDate())
            .padStart(2, "0");

        const random = Math.floor(
            Math.random() * 900 + 100
        );

        return `SAL-${year}${month}${day}-${random}`;

    };

    const todayString = new Date()
        .toISOString()
        .split("T")[0];

    const [invoiceNumber, setInvoiceNumber] =
        useState(generateInvoiceNumber());

    const [saleDate, setSaleDate] =
        useState(todayString);

    const [customerId, setCustomerId] =
        useState("");

    const [customers, setCustomers] =
        useState([]);

    const [items, setItems] =
        useState([]);

    const [openItemDialog, setOpenItemDialog] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [message, setMessage] =
        useState("");

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            const data = await getCustomers();

            setCustomers(data);

        }

        catch (error) {

            console.error(error);

        }

    };
    const addItem = (item) => {

        const existing = items.find(
            i => i.productId === item.productId
        );

        if (existing) {

            const updatedItems = items.map(i => {

                if (i.productId === item.productId) {

                    const newQty =
                        Number(i.quantity) +
                        Number(item.quantity);

                    return {

                        ...i,

                        quantity: newQty,

                        subtotal:
                            newQty *
                            Number(i.unitPrice),

                    };

                }

                return i;

            });

            setItems(updatedItems);

        }

        else {

            setItems([
                ...items,
                {
                    id: Date.now(),
                    ...item,
                },
            ]);

        }

        setOpenItemDialog(false);

    };

    const removeItem = (id) => {

        setItems(
            items.filter(
                item => item.id !== id
            )
        );

    };

    const grandTotal = useMemo(() => {

        return items.reduce(

            (sum, item) =>

                sum +
                Number(item.subtotal),

            0

        );

    }, [items]);

    const handleSaveSale = async () => {

        if (!customerId) {

            alert("Please select customer.");

            return;

        }

        if (items.length === 0) {

            alert("Please add sale items.");

            return;

        }

        try {

            await createSale({

                invoiceNumber,

                saleDate,

                customerId,

                items: items.map(item => ({

                    productId:
                    item.productId,

                    quantity:
                        Number(item.quantity),

                    unitPrice:
                        Number(item.unitPrice),

                })),

            });

            setMessage(
                "Sale saved successfully."
            );

            setSuccess(true);

            setItems([]);

            setCustomerId("");

            setInvoiceNumber(
                generateInvoiceNumber()
            );

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save sale."
            );

        }

    };

    const columns = [

        {
            field: "productName",
            headerName: "Product",
            flex: 2,
        },

        {
            field: "currentStock",
            headerName: "Available",
            width: 130,
        },

        {
            field: "quantity",
            headerName: "Qty",
            width: 90,
        },

        {
            field: "unitPrice",
            headerName: "Unit Price",
            width: 140,
        },

        {
            field: "subtotal",
            headerName: "Subtotal",
            width: 150,
        },

        {
            field: "action",
            headerName: "Action",
            width: 120,

            renderCell: (params) => (

                <Button
                    color="error"
                    onClick={() =>
                        removeItem(
                            params.row.id
                        )
                    }
                >

                    REMOVE

                </Button>

            ),

        },

    ];
    return (

        <>

            <Paper sx={{ p: 3 }}>

                <Typography
                    variant="h4"
                    mb={3}
                >

                    Sales Entry

                </Typography>

                <Grid
                    container
                    spacing={2}
                    mb={3}
                >

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            label="Invoice Number"
                            value={invoiceNumber}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            fullWidth
                            type="date"
                            value={saleDate}
                            onChange={(e) =>
                                setSaleDate(
                                    e.target.value
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            select
                            fullWidth
                            label="Customer"
                            value={customerId}
                            onChange={(e) =>
                                setCustomerId(e.target.value)
                            }

                            SelectProps={{
                                displayEmpty: true,
                            }}

                            sx={{
                                minWidth: 250,
                            }}
                        >

                            {customers.map(customer => (

                                <MenuItem
                                    key={customer.id}
                                    value={customer.id}
                                >

                                    {customer.firstName} {customer.lastName}

                                </MenuItem>

                            ))}

                        </TextField>

                    </Grid>

                </Grid>

                <Typography
                    variant="h5"
                    mb={2}
                >

                    Sale Items

                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        setOpenItemDialog(true)
                    }
                    sx={{ mb: 2 }}
                >

                    ADD ITEM

                </Button>

                <DataGrid
                    autoHeight
                    rows={items}
                    columns={columns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />

                <Typography
                    variant="h5"
                    mt={3}
                    mb={2}
                    fontWeight="bold"
                >

                    Grand Total :
                    {" "}
                    ₹
                    {" "}
                    {grandTotal.toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2,
                        }
                    )}

                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveSale}
                >

                    SAVE SALE

                </Button>

            </Paper>
            <SaleItemDialog
                open={openItemDialog}
                onClose={() =>
                    setOpenItemDialog(false)
                }
                onSave={addItem}
            />

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() =>
                    setSuccess(false)
                }
            >

                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() =>
                        setSuccess(false)
                    }
                >

                    {message}

                </Alert>

            </Snackbar>

        </>

    );

}

export default SalePage;