import { Button, Container, Typography } from "@mui/material";
import { logout } from "../../utils/auth";

function DashboardPage() {

    const handleLogout = () => {

        logout();
        window.location.href = "/";

    };

    return (

        <Container sx={{ mt: 5 }}>

            <Typography variant="h3" gutterBottom>

                Welcome to Simis Collection ERP

            </Typography>

            <Typography variant="h6">

                Login Successful 🎉

            </Typography>

            <Button
                variant="contained"
                color="error"
                sx={{ mt: 4 }}
                onClick={handleLogout}
            >
                Logout
            </Button>

        </Container>

    );

}

export default DashboardPage;