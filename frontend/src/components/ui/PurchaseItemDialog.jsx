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

function PurchaseItemDialog({
                                open,
                                onClose,
                                onSave,
                            }) {

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({

        productId: "",

        productName: "",

        currentStock: 0,

        averagePurchasePrice: 0,

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

                averagePurchasePrice: 0,

                quantity: "",

                unitPrice: "",

            });

        }

    }, [open]);

    const loadProducts = async () => {

        try {

            const data = await getProductsWithStock();

            setProducts(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        if (name === "productId") {

            const selected = products.find(

                p => p.productId === Number(value)

            );

            setFormData({

                ...formData,

                productId: value,

                productName: selected?.productName || "",

                currentStock: selected?.currentStock || 0,

                averagePurchasePrice:
                    selected?.averagePurchasePrice || 0,

                unitPrice: "",

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

    const handleSubmit = () => {

        if (

            !formData.productId ||

            !formData.quantity ||

            !formData.unitPrice

        ) {

            alert("Please fill all fields.");

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

                Add Purchase Item

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

                            Current Stock :
                            {formData.currentStock}

                        </Typography>

                        <Typography
                            color="secondary"
                            fontWeight="bold"
                        >
                            Average Purchase Price :
                            ₹ {formData.averagePurchasePrice}
                        </Typography>

                        <Typography
                            color="secondary"
                            fontWeight="bold"
                        >

                            Stock After Purchase :
                            {" "}
                            {Number(formData.currentStock) +
                                Number(formData.quantity || 0)}

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
                            variant="h6"
                            fontWeight="bold"
                        >

                            Subtotal :
                            ₹ {subtotal.toFixed(2)}

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
                >
                    Add Item
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default PurchaseItemDialog;