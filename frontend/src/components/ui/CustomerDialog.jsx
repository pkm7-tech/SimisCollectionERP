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

function CustomerDialog({
                            open,
                            onClose,
                            onSave,
                            customer,
                        }) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {

        if (customer) {

            setFormData({

                firstName: customer.firstName || "",

                lastName: customer.lastName || "",

                email: customer.email || "",

                phone: customer.phone || "",

                address: customer.address || "",

            });

        } else {

            setFormData({

                firstName: "",

                lastName: "",

                email: "",

                phone: "",

                address: "",

            });

        }

    }, [customer, open]);

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value,

        });

    };

    const handleSubmit = () => {

        if (
            !formData.firstName ||
            !formData.lastName
        ) {

            alert("First Name and Last Name are required.");

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

                {customer
                    ? "Edit Customer"
                    : "Add Customer"}

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
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
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
                    {customer ? "Update" : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default CustomerDialog;