import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Box,Divider
} from "@mui/material";


function SaleDetailsDialog({

                               open,

                               onClose,

                               sale

                           }) {

    if (!sale) {

        return null;

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    color: "primary.main"
                }}
            >
                Sale Details
            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 3 }}
                >

                    <Grid item xs={4}>

                        <Typography>

                            <strong>Invoice No :</strong>

                            {" "}

                            {sale.invoiceNumber}

                        </Typography>

                    </Grid>

                    <Grid item xs={4}>

                        <Typography>

                            <strong>Customer :</strong>

                            {" "}

                            {sale.customerName}

                        </Typography>

                    </Grid>

                    <Grid item xs={4}>

                        <Typography>

                            <strong>Date :</strong>

                            {" "}

                            {new Date(sale.saleDate)
                                .toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )}

                        </Typography>

                    </Grid>

                    <Grid item xs={12}>

                        <Typography>

                            <strong>Total Items :</strong>

                            {" "}

                            {sale.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            )}

                        </Typography>

                    </Grid>

                </Grid>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>#</TableCell>

                            <TableCell>

                                Product

                            </TableCell>

                            <TableCell align="right">

                                Qty

                            </TableCell>

                            <TableCell align="right">

                                Unit Price

                            </TableCell>

                            <TableCell align="right">

                                Subtotal

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            sale.items.map(

                                (item, index) => (

                                    <TableRow
                                        key={index}
                                    >

                                        <TableCell>

                                            {index + 1}

                                        </TableCell>

                                        <TableCell>

                                            {item.productName}

                                        </TableCell>

                                        <TableCell
                                            align="right"
                                        >

                                            {item.quantity}

                                        </TableCell>

                                        <TableCell
                                            align="right"
                                        >

                                            ₹ {Number(item.unitPrice)
                                            .toLocaleString(
                                                "en-IN",
                                                {
                                                    minimumFractionDigits: 2
                                                }
                                            )}

                                        </TableCell>

                                        <TableCell
                                            align="right"
                                        >

                                            ₹ {Number(item.subtotal)
                                            .toLocaleString(
                                                "en-IN",
                                                {
                                                    minimumFractionDigits: 2
                                                }
                                            )}

                                        </TableCell>

                                    </TableRow>

                                )

                            )

                        }

                    </TableBody>

                </Table>

                <Box
                    sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: "2px solid #ddd",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >

                        Grand Total :

                        {" "}

                        ₹ {Number(sale.totalAmount)
                        .toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2
                            }
                        )}

                    </Typography>

                </Box>

            </DialogContent>

            <DialogActions>

                <Button
                    variant="contained"
                    onClick={onClose}
                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default SaleDetailsDialog;