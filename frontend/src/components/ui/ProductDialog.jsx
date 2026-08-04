import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
} from "@mui/material";

import { getCategories } from "../../services/categoryService";

function ProductDialog({
                           open,
                           onClose,
                           onSave,
                           product,
                       }) {

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: "",
    });

    useEffect(() => {

        if (!open) return;

        loadCategories();

        if (product) {

            setFormData({

                name: product.name || "",

                description: product.description || "",

                price: product.price || "",

                categoryId: product.categoryId || "",

            });

        } else {

            setFormData({

                name: "",

                description: "",

                price: "",

                categoryId: "",

            });

        }

    }, [open, product]);

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value,

        });

    };

    const handleSubmit = () => {

        if (
            !formData.name ||
            !formData.price ||
            !formData.categoryId
        ) {

            alert("Please fill all required fields.");

            return;

        }

        onSave(formData);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {product ? "Edit Product" : "Add Product"}

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >

                            {categories.map((category) => (

                                <MenuItem
                                    key={category.id}
                                    value={category.id}
                                >

                                    {category.name}

                                </MenuItem>

                            ))}

                        </TextField>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >

                    {product ? "Update" : "Save"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ProductDialog;