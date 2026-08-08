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

import CategoryIcon from "@mui/icons-material/Category";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import {
    getDashboardSummary,
    getMonthlySales,
    getMonthlyPurchases
} from "../../services/dashboardService";


function DashboardPage() {

    const [summary, setSummary] = useState(null);
    const [monthlySales, setMonthlySales] = useState([]);
    const [monthlyPurchases, setMonthlyPurchases] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const [
                summaryData,
                salesData,
                purchasesData
            ] = await Promise.all([
                getDashboardSummary(),
                getMonthlySales(),
                getMonthlyPurchases()
            ]);

            setSummary(summaryData);
            setMonthlySales(salesData);
            setMonthlyPurchases(purchasesData);

        } catch (error) {

            console.error(
                "Failed to load dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const formatCurrency = (value) => {

        return `₹${Number(value || 0).toLocaleString("en-IN")}`;

    };


    const formatMonth = (month) => {

        if (!month) {
            return "";
        }

        const [year, monthNumber] = month.split("-");

        const date = new Date(
            Number(year),
            Number(monthNumber) - 1
        );

        return date.toLocaleString("en-IN", {
            month: "short",
            year: "numeric"
        });

    };


    const prepareChartData = (data) => {

        return data.map((item) => ({
            month: formatMonth(item.month),
            amount: Number(item.amount || 0)
        }));

    };


    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >

                <CircularProgress />

            </Box>

        );

    }


    if (!summary) {

        return (

            <Container
                maxWidth="xl"
                sx={{ mt: 4 }}
            >

                <Typography
                    variant="h5"
                    color="error"
                >

                    Unable to load dashboard data.

                </Typography>

            </Container>

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
            value: formatCurrency(summary.totalRevenue),
            icon: <CurrencyRupeeIcon sx={{ fontSize: 46 }} />,
            color: "#2E7D32"
        },

        {
            title: "Inventory Value",
            value: formatCurrency(summary.inventoryValue),
            icon: <AccountBalanceWalletIcon sx={{ fontSize: 46 }} />,
            color: "#6A1B9A"
        }

    ];


    const salesChartData =
        prepareChartData(monthlySales);

    const purchasesChartData =
        prepareChartData(monthlyPurchases);


    return (

        <Container
            maxWidth="xl"
            sx={{
                mt: 4,
                mb: 5
            }}
        >

            {/* Dashboard Header */}

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


            {/* KPI CARDS */}

            <Grid
                container
                spacing={3}
            >

                {cards.map((card) => (

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
                                                mt: 1,
                                                lineHeight: 1.1
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
                                            backgroundColor:
                                            card.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white",
                                            flexShrink: 0
                                        }}
                                    >

                                        {card.icon}

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>


            {/* CHARTS */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr"
                    },
                    gap: 3,
                    mt: 4,
                    width: "100%"
                }}
            >

                {/* MONTHLY SALES */}

                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        width: "100%"
                    }}
                >

                    <CardContent sx={{ p: 3 }}>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ mb: 3 }}
                        >

                            Monthly Sales

                        </Typography>


                        <Box
                            sx={{
                                width: "100%",
                                height: 380
                            }}
                        >

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={salesChartData}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 25,
                                        bottom: 20
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="month"
                                    />

                                    <YAxis
                                        width={85}
                                        tickFormatter={(value) =>
                                            `₹${Number(value).toLocaleString("en-IN")}`
                                        }
                                    />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Legend />

                                    <Bar
                                        dataKey="amount"
                                        name="Sales"
                                        fill="#D32F2F"
                                        radius={[
                                            6,
                                            6,
                                            0,
                                            0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </Box>

                    </CardContent>

                </Card>


                {/* MONTHLY PURCHASES */}

                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        width: "100%"
                    }}
                >

                    <CardContent sx={{ p: 3 }}>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ mb: 3 }}
                        >

                            Monthly Purchases

                        </Typography>


                        <Box
                            sx={{
                                width: "100%",
                                height: 380
                            }}
                        >

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={purchasesChartData}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 25,
                                        bottom: 20
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="month"
                                    />

                                    <YAxis
                                        width={85}
                                        tickFormatter={(value) =>
                                            `₹${Number(value).toLocaleString("en-IN")}`
                                        }
                                    />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Legend />

                                    <Bar
                                        dataKey="amount"
                                        name="Purchases"
                                        fill="#00897B"
                                        radius={[
                                            6,
                                            6,
                                            0,
                                            0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </Box>

                    </CardContent>

                </Card>

            </Box>


        </Container>

    );
}


export default DashboardPage;