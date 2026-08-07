import SaleDetailsDialog
    from "../../components/ui/SaleDetailsDialog";

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
    getSaleHistory,
    getSaleById
} from "../../services/saleService";

function SalesHistoryPage() {

    const [sales, setSales] = useState([]);

    const [search, setSearch] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {

        loadSales();

    }, []);

    const loadSales = async () => {

        try {

            const data = await getSaleHistory();

            setSales(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleView = async (id) => {

        try {

            const data = await getSaleById(id);

            setSelectedSale(data);

            setDialogOpen(true);

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredSales = useMemo(() => {

        return sales.filter(sale =>

            sale.invoiceNumber
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            sale.customerName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [sales, search]);

    const columns = [

        {
            field: "invoiceNumber",
            headerName: "Invoice No.",
            flex: 1.5,
        },

        {
            field: "saleDate",
            headerName: "Sale Date",
            flex: 1.2,
        },

        {
            field: "customerName",
            headerName: "Customer",
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
                Sales History
            </Typography>

            <TextField
                fullWidth
                label="Search by Invoice or Customer"
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

                    rows={filteredSales}

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

            <SaleDetailsDialog

                open={dialogOpen}

                onClose={() => setDialogOpen(false)}

                sale={selectedSale}

            />

        </Paper>

    );

}

export default SalesHistoryPage;