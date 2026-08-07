import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    CircularProgress
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { getDashboardSummary }
    from "../../services/dashboardService";

function DashboardPage() {

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardSummary();

            setSummary(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={10}
            >

                <CircularProgress />

            </Box>

        );

    }

    const cards = [

        {
            title: "Categories",
            value: summary.totalCategories,
            icon: <CategoryIcon sx={{ fontSize: 46 }} />,
            color: "#8E24AA"
        },

        {
            title: "Products",
            value: summary.totalProducts,
            icon: <AutoAwesomeIcon sx={{ fontSize: 46 }} />,
            color: "#1976D2"
        },

        {
            title: "Customers",
            value: summary.totalCustomers,
            icon: <PeopleIcon sx={{ fontSize: 46 }} />,
            color: "#2E7D32"
        },

        {
            title: "Suppliers",
            value: summary.totalSuppliers,
            icon: <LocalShippingIcon sx={{ fontSize: 46 }} />,
            color: "#EF6C00"
        },

        {
            title: "Purchases",
            value: summary.totalPurchases,
            icon: <ShoppingCartIcon sx={{ fontSize: 46 }} />,
            color: "#00897B"
        },

        {
            title: "Sales",
            value: summary.totalSales,
            icon: <PointOfSaleIcon sx={{ fontSize: 46 }} />,
            color: "#D32F2F"
        },

        {
            title: "Inventory",
            value: summary.inventoryItems,
            icon: <Inventory2OutlinedIcon sx={{ fontSize: 46 }} />,
            color: "#3949AB"
        },

        {
            title: "Stock Quantity",
            value: summary.totalInventoryQuantity,
            icon: <ManageAccountsIcon sx={{ fontSize: 46 }} />,
            color: "#6D4C41"
        },

        {
            title: "Revenue",
            value:
                summary.totalRevenue == null
                    ? "₹0"
                    : `₹${Number(summary.totalRevenue).toLocaleString("en-IN")}`,

            icon: <CurrencyRupeeIcon sx={{ fontSize: 46 }} />,

            color: "#2E7D32"
        },

        {
            title: "Inventory Value",
            value:
                summary.inventoryValue == null
                    ? "₹0"
                    : `₹${Number(summary.inventoryValue).toLocaleString("en-IN")}`,

            icon: <AccountBalanceWalletIcon sx={{ fontSize: 46 }} />,

            color: "#6A1B9A"
        },

    ];
    return (

        <Container
            maxWidth="xl"
            sx={{ mt: 4, mb: 4 }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >

                Dashboard

            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
            >

                Welcome to Simis Collection ERP

            </Typography>

            <Grid
                container
                spacing={3}
            >

                {

                    cards.map((card) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={card.title}
                        >

                            <Card
                                elevation={6}
                                sx={{
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    transition: "0.35s",

                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: 12
                                    }
                                }}
                            >

                                <CardContent
                                    sx={{
                                        p: 3,
                                        minHeight: 170
                                    }}
                                >

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <Box>

                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={700}
                                                color="text.secondary"
                                            >

                                                {card.title}

                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontSize: 48,
                                                    fontWeight: 700,
                                                    mt: 1
                                                }}
                                            >

                                                {card.value}

                                            </Typography>

                                        </Box>

                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%",
                                                backgroundColor: card.color,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "white"
                                            }}
                                        >

                                            {card.icon}

                                        </Box>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                }

            </Grid>

        </Container>

    );

}

export default DashboardPage;