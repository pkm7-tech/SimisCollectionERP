import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from "@mui/material";

function SupplierDialog({
                            open,
                            onClose,
                            onSave,
                            supplier,
                        }) {

    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {

        if (supplier) {

            setFormData({

                companyName: supplier.companyName || "",

                contactPerson: supplier.contactPerson || "",

                email: supplier.email || "",

                phone: supplier.phone || "",

                address: supplier.address || "",

            });

        } else {

            setFormData({

                companyName: "",

                contactPerson: "",

                email: "",

                phone: "",

                address: "",

            });

        }

    }, [supplier, open]);

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value,

        });

    };

    const handleSubmit = () => {

        if (
            !formData.companyName ||
            !formData.contactPerson
        ) {

            alert("Company Name and Contact Person are required.");

            return;

        }

        onSave(formData);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {supplier
                    ? "Edit Supplier"
                    : "Add Supplier"}

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Contact Person"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
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
                    {supplier ? "Update" : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default SupplierDialog;