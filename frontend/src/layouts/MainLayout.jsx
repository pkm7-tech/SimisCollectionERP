import { Outlet, useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LogoutIcon from "@mui/icons-material/Logout";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReceiptLongIcon
    from "@mui/icons-material/ReceiptLong";

const drawerWidth = 250;

function MainLayout() {
    const navigate = useNavigate();

    const menuItems = [
        { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { text: "Categories", path: "/categories", icon: <CategoryIcon /> },
        { text: "Products", path: "/products", icon: <AutoAwesomeIcon /> },
        { text: "Customers", path: "/customers", icon: <PeopleIcon /> },
        { text: "Suppliers", path: "/suppliers", icon: <LocalShippingIcon /> },
        { text: "Purchases", path: "/purchases", icon: <ShoppingCartIcon /> },
        {
            text: "Purchase History",
            path: "/purchase-history",
            icon: <ReceiptLongIcon />,
        },
        { text: "Sales", path: "/sales", icon: <PointOfSaleIcon /> },
        {
            text: "Sales History",
            path: "/sales-history",
            icon: <ReceiptLongIcon />,
        },

        {
            text: "Inventory",
            path: "/inventory",
            icon: <Inventory2OutlinedIcon />,
        },

        { text: "Users", path: "/users", icon: <ManageAccountsIcon /> },

        { text: "Logout", path: "/logout", icon: <LogoutIcon /> },
    ];

    return (

        <Box sx={{ display: "flex" }}>

            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >

                <Toolbar>

                    <Typography variant="h6">

                        Simis Collection ERP

                    </Typography>

                </Toolbar>

            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
            >

                <Toolbar />

                <List>

                    {menuItems.map((item) => (

                        <ListItem
                            key={item.text}
                            disablePadding
                        >

                            <ListItemButton
                                onClick={() => {

                                    if (item.text === "Logout") {

                                        localStorage.clear();
                                        navigate("/");

                                    } else {

                                        navigate(item.path);

                                    }

                                }}
                            >

                                <ListItemIcon>

                                    {item.icon}

                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />

                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >

                <Toolbar />

                <Outlet />

            </Box>

        </Box>

    );

}

export default MainLayout;