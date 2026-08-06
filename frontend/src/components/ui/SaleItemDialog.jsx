import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Typography,
} from "@mui/material";

import { getProductsWithStock } from "../../services/inventoryService";

function SaleItemDialog({

                            open,

                            onClose,

                            onSave,

                        }) {

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({

        productId: "",

        productName: "",

        currentStock: 0,

        quantity: "",

        unitPrice: "",

    });

    useEffect(() => {

        if (open) {

            loadProducts();

            setFormData({

                productId: "",

                productName: "",

                currentStock: 0,

                quantity: "",

                unitPrice: "",

            });

        }

    }, [open]);

    const loadProducts = async () => {

        try {

            const data =
                await getProductsWithStock();

            setProducts(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (event) => {

        const { name, value } =
            event.target;

        if (name === "productId") {

            const selected =
                products.find(

                    p =>
                        p.productId ===
                        Number(value)

                );

            setFormData({

                ...formData,

                productId: value,

                productName:
                    selected?.productName || "",

                currentStock:
                    selected?.currentStock || 0,

                unitPrice:
                    selected?.averagePurchasePrice || "",

            });

            return;

        }

        setFormData({

            ...formData,

            [name]: value,

        });

    };

    const subtotal =

        Number(formData.quantity || 0) *

        Number(formData.unitPrice || 0);

    const remainingStock =

        Number(formData.currentStock) -

        Number(formData.quantity || 0);

    const handleSubmit = () => {

        if (

            !formData.productId ||

            !formData.quantity ||

            !formData.unitPrice

        ) {

            alert("Please fill all fields.");

            return;

        }

        if (

            Number(formData.quantity) >

            Number(formData.currentStock)

        ) {

            alert("Insufficient stock.");

            return;

        }

        onSave({

            ...formData,

            subtotal,

        });

    };

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="sm"

        >

            <DialogTitle>

                Add Sale Item

            </DialogTitle>

            <DialogContent>

                <Grid

                    container

                    spacing={2}

                    sx={{ mt: 1 }}

                >
                    <Grid item xs={12}>

                        <TextField
                            select
                            fullWidth
                            label="Product"
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                        >

                            {products.map(product => (

                                <MenuItem
                                    key={product.productId}
                                    value={product.productId}
                                >

                                    {product.productName}

                                </MenuItem>

                            ))}

                        </TextField>

                    </Grid>

                    <Grid item xs={12}>

                        <Typography
                            color="primary"
                            fontWeight="bold"
                        >

                            Available Stock :
                            {" "}
                            {formData.currentStock}

                        </Typography>

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Unit Price"
                            name="unitPrice"
                            value={formData.unitPrice}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Typography
                            color={
                                remainingStock < 0
                                    ? "error"
                                    : "success.main"
                            }
                            fontWeight="bold"
                        >

                            Remaining Stock :
                            {" "}
                            {remainingStock}

                        </Typography>

                    </Grid>

                    <Grid item xs={12}>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >

                            Subtotal :
                            {" "}
                            ₹
                            {" "}
                            {subtotal.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                }
                            )}

                        </Typography>

                    </Grid>
                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        !formData.productId ||
                        !formData.quantity ||
                        Number(formData.quantity) <= 0 ||
                        Number(formData.quantity) >
                        Number(formData.currentStock)
                    }
                >
                    Add Item
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default SaleItemDialog;