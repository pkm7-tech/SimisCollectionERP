import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    Grid,
    Snackbar,
    Alert,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

import {
    createPurchase,
} from "../../services/purchaseService";

import { getSuppliers } from "../../services/supplierService";

import PurchaseItemDialog
    from "../../components/ui/PurchaseItemDialog";

function PurchasePage() {

    const generateInvoiceNumber = () => {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        const random = Math.floor(
            Math.random() * 900 + 100
        );

        return `PUR-${year}${month}${day}-${random}`;

    };

    const [invoiceNumber, setInvoiceNumber] =
        useState(generateInvoiceNumber());

    const [purchaseDate, setPurchaseDate] = useState("");

    const [supplierId, setSupplierId] = useState("");

    const [suppliers, setSuppliers] = useState([]);

    const [items, setItems] = useState([]);

    const [openItemDialog, setOpenItemDialog] =
        useState(false);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadSuppliers();

    }, []);

    const loadSuppliers = async () => {

        try {

            const data =
                await getSuppliers();

            setSuppliers(data);

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
                            newQty * Number(i.unitPrice),

                    };

                }

                return i;

            });

            setItems(updatedItems);

        } else {

            setItems([
                ...items,
                {
                    id: Date.now(),
                    ...item,
                    subtotal:
                        Number(item.quantity) *
                        Number(item.unitPrice),
                },
            ]);

        }

        setOpenItemDialog(false);

    };

    const removeItem = (index) => {

        setItems(
            items.filter((_, i) => i !== index)
        );

    };

    const grandTotal = items.reduce(

        (sum, item) =>
            sum + item.subtotal,

        0

    );

    const columns = [

        {
            field: "productName",
            headerName: "Product",
            flex: 2,
        },

        {
            field: "currentStock",
            headerName: "Current Stock",
            width: 150,
        },

        {
            field: "quantity",
            headerName: "Qty",
            width: 100,
        },

        {
            field: "unitPrice",
            headerName: "Unit Price",
            width: 150,

            valueFormatter: (params) =>

                `₹ ${Number(params).toLocaleString("en-IN", {

                    minimumFractionDigits: 2,

                })}`,

        },

        {
            field: "subtotal",
            headerName: "Subtotal",
            width: 170,

            valueFormatter: (params) =>

                `₹ ${Number(params).toLocaleString("en-IN", {

                    minimumFractionDigits: 2,

                })}`,

        },

        {
            field: "action",
            headerName: "Action",
            width: 120,

            renderCell: (params) => (

                <Button
                    color="error"
                    onClick={() =>
                        removeItem(params.row.id)
                    }
                >

                    Remove

                </Button>

            ),

        },

    ];
    const handleSavePurchase = async () => {

        try {

            if (!invoiceNumber) {

                alert("Invoice Number is required.");

                return;

            }

            if (!purchaseDate) {

                alert("Purchase Date is required.");

                return;

            }

            if (!supplierId) {

                alert("Please select a supplier.");

                return;

            }

            if (items.length === 0) {

                alert("Please add at least one purchase item.");

                return;

            }

            const request = {

                invoiceNumber,

                purchaseDate,

                supplierId: Number(supplierId),

                items: items.map(item => ({
                    productId: item.productId,
                    quantity: Number(item.quantity),
                    unitPrice: Number(item.unitPrice),
                })),

            };

            await createPurchase(request);

            setMessage("Purchase saved successfully!");

            setSuccess(true);

            setInvoiceNumber(generateInvoiceNumber());

            setPurchaseDate("");``

            setSupplierId("");

            setItems([]);

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save purchase."
            );

        }

    };

    return (

        <>

            <Typography
                variant="h4"
                mb={3}
            >

                Purchase Entry

            </Typography>

            <Paper
                sx={{
                    p:3,
                    mb:3,
                }}
            >

                <Grid
                    container
                    spacing={2}
                >

                    <Grid item xs={4}>

                        <TextField
                            fullWidth
                            label="Invoice Number"
                            value={invoiceNumber}
                            InputProps={{
                                readOnly: true,
                            }}
                            onChange={(e) =>
                                setInvoiceNumber(e.target.value)
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            type="date"
                            value={purchaseDate}
                            onChange={(e) =>
                                setPurchaseDate(e.target.value)
                            }
                        />
                    </Grid>

                    <Grid item xs={4}>

                        <TextField
                            select
                            fullWidth
                            label="Supplier"
                            value={supplierId}
                            onChange={(e)=>
                                setSupplierId(
                                    e.target.value
                                )
                            }
                        >

                            {suppliers.map(
                                supplier => (

                                    <MenuItem
                                        key={supplier.id}
                                        value={supplier.id}
                                    >

                                        {supplier.companyName}

                                    </MenuItem>

                                ))}

                        </TextField>

                    </Grid>

                </Grid>

            </Paper>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Typography variant="h5">

                    Purchase Items

                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenItemDialog(true)}
                >

                    Add Item

                </Button>

            </Box>

            <Paper sx={{ height: 350, mb: 3 }}>

                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSizeOptions={[5]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />

            </Paper>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >

                    Grand Total :
                    ₹ {grandTotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                })}

                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleSavePurchase}
                >

                    Save Purchase

                </Button>

            </Box>

            <PurchaseItemDialog

                open={openItemDialog}

                onClose={() => setOpenItemDialog(false)}

                onSave={addItem}

            />
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

export default PurchasePage;