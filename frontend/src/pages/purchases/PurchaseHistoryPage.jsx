import PurchaseDetailsDialog
    from "../../components/ui/PurchaseDetailsDialog";

import { useEffect, useMemo, useState } from "react";

import {
    Paper,
    Typography,
    TextField,
    Button
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";

import {
    getPurchaseHistory,
    getPurchaseById
} from "../../services/purchaseService";

function PurchaseHistoryPage() {

    const [purchases, setPurchases] = useState([]);

    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedPurchase, setSelectedPurchase] = useState(null);

    useEffect(() => {

        loadPurchases();

    }, []);

    const loadPurchases = async () => {

        try {

            const data =
                await getPurchaseHistory();

            setPurchases(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleView = async (id) => {

        try {

            const data =
                await getPurchaseById(id);

            setSelectedPurchase(data);

            setDialogOpen(true);

        }

        catch (error) {

            console.error(error);

        }

    };
    const filteredPurchases = useMemo(() => {

        return purchases.filter(purchase =>

            purchase.invoiceNumber
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            purchase.supplierName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [purchases, search]);

    const columns = [

        {
            field: "invoiceNumber",
            headerName: "Invoice No.",
            flex: 1.5,
        },

        {
            field: "purchaseDate",
            headerName: "Purchase Date",
            flex: 1.2,
        },

        {
            field: "supplierName",
            headerName: "Supplier",
            flex: 2,
        },

        {
            field: "totalItems",
            headerName: "Items",
            type: "number",
            flex: 0.8,
        },

        {
            field: "totalAmount",
            headerName: "Total Amount",
            type: "number",
            flex: 1.3,
            valueFormatter: (value) =>
                `₹ ${Number(value).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`,
        },

        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            width: 120,

            renderCell: (params) => (
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(params.row.id)}
                >

                    View

                </Button>

            ),

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
                Purchase History
            </Typography>

            <TextField
                fullWidth
                label="Search by Invoice or Supplier"
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
                    height: 650,
                    width: "100%",
                }}
            >

                <DataGrid

                    rows={filteredPurchases}

                    columns={columns}

                    getRowId={(row) => row.id}

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
            <PurchaseDetailsDialog

                open={dialogOpen}

                onClose={() => setDialogOpen(false)}

                purchase={selectedPurchase}

            />
        </Paper>

    );

}

export default PurchaseHistoryPage;