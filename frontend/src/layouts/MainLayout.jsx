import { Outlet } from "react-router-dom";
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

const drawerWidth = 250;

function MainLayout() {

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon /> },
        { text: "Categories", icon: <CategoryIcon /> },
        { text: "Products", icon: <InventoryIcon /> },
        { text: "Customers", icon: <PeopleIcon /> },
        { text: "Suppliers", icon: <LocalShippingIcon /> },
        { text: "Purchases", icon: <ShoppingCartIcon /> },
        { text: "Sales", icon: <PointOfSaleIcon /> },
        { text: "Logout", icon: <LogoutIcon /> },
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

                            <ListItemButton>

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