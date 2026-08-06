import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            await login(username, password);


            // Save Username
            localStorage.setItem("username", username);

            // Go to Dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Invalid Username or Password");

        }

    };

    return (

        <Container maxWidth="sm">

            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    marginTop: 10,
                }}
            >

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >
                    Simis Collection ERP
                </Typography>

                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Box mt={3}>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                    >
                        LOGIN
                    </Button>

                </Box>

            </Paper>

        </Container>

    );

}

export default LoginPage;