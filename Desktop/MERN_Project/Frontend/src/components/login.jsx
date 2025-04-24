import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Alert,
  Collapse
} from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your submit logic here
    const data = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.id)

      if (response.status == 200) {
        localStorage.setItem("userId", result.id);
        setSeverity('success');
        setError('Login successful!');
        setAlertOpen(true);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setSeverity('error');
        if (response.status === 404) {
            setError('User not found');
        } else if (response.status === 401) {
            setError('Invalid credentials');
        } else {
            setError(result.message || 'Login failed');
        }
        setAlertOpen(true);
      }
    } catch (err) {
      console.error("error:", err);
      setSeverity('error');
      setError('Something went wrong');
      setAlertOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
        background: `url(${logo}) center/cover no-repeat`, // Background image
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255,)", // Semi-transparent overlay
          zIndex: -1,
          overflow: "hidden",
        }}
      ></Box>

      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: "blur(1px)", // Blurry background for the card
            backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent white background to let the blur show
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>

            <Collapse in={alertOpen}>
              <Alert
                severity={severity}
                onClose={() => setAlertOpen(false)}
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            </Collapse>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
