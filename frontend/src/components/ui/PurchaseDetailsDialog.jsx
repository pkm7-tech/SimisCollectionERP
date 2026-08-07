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
    Box
} from "@mui/material";
function PurchaseDetailsDialog({

                                   open,

                                   onClose,

                                   purchase

                               }) {

    if (!purchase) {

        return null;

    }
    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                Purchase Details

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mb: 3 }}>

                    <Grid item xs={4}>

                        <Typography>

                            <strong>Invoice No:</strong>

                            {" "}

                            {purchase.invoiceNumber}

                        </Typography>

                    </Grid>

                    <Grid item xs={4}>

                        <Typography>

                            <strong>Supplier:</strong>

                            {" "}

                            {purchase.supplierName}

                        </Typography>

                    </Grid>

                    <Grid item xs={4}>

                        <Typography>

                            <strong>Date:</strong>

                            {" "}

                            {new Date(purchase.purchaseDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })}

                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                            <strong>Total Items:</strong> {purchase.items.length}
                        </Typography>

                    </Grid>

                </Grid>
                <Table>

                    <TableHead>

                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {purchase.items.map((item, index) => (

                            <TableRow key={item.id}>

                                <TableCell>

                                    {item.productName}

                                </TableCell>

                                <TableCell align="right">

                                    {item.quantity}

                                </TableCell>

                                <TableCell align="right">

                                    ₹ {Number(item.unitPrice).toLocaleString("en-IN", {

                                    minimumFractionDigits: 2

                                })}

                                </TableCell>

                                <TableCell align="right">

                                    ₹ {Number(item.subtotal).toLocaleString("en-IN", {

                                    minimumFractionDigits: 2

                                })}

                                </TableCell>

                            </TableRow>

                        ))}

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
                        ₹ {Number(purchase.totalAmount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2
                    })}
                    </Typography>

                </Box>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    variant="contained"
                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default PurchaseDetailsDialog;