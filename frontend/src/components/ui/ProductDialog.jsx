
import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from "@mui/material";

function ProductDialog({ open, onClose, onSave }) {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        active: true,
    });

    useEffect(() => {
        if (open) {
            setProduct({
                name: "",
                description: "",
                price: "",
                categoryId: "",
                active: true,
            });
        }
    }, [open]);

    const handleChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    };

    const handleSave = () => {
        onSave(product);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add Product</DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Category ID"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ProductDialog;