import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Switch,
    Grid,
} from "@mui/material";

function CategoryDialog({
                            open,
                            onClose,
                            onSave,
                            category,
                        }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        active: true,
    });

    useEffect(() => {

        if (category) {

            setFormData({
                name: category.name || "",
                description: category.description || "",
                active:
                    category.active !== undefined
                        ? category.active
                        : true,
            });

        } else {

            setFormData({
                name: "",
                description: "",
                active: true,
            });

        }

    }, [category, open]);

    const handleChange = (event) => {

        const { name, value, checked, type } = event.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });

    };

    const handleSubmit = () => {

        if (!formData.name.trim()) {

            alert("Category name is required.");

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

                {category
                    ? "Edit Category"
                    : "Add Category"}

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            label="Category Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.active}
                                    onChange={handleChange}
                                    name="active"
                                />
                            }
                            label="Active"
                        />

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
                    {category ? "Update" : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default CategoryDialog;