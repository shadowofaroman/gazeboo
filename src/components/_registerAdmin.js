import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const RegisterAdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Initialize navigate hook

  const handleRegister = async () => {
    if (accessCode !== "TEST@ALRESKO") {
      alert("Invalid Access Code");
      return;
    }

    const requestBody = {
      email: email,
      password: password,
      role: 1, // 
    };

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://alfresko-apis.vercel.app/api/v1/registeruser",
        requestBody
      );
      if (response.status === 201) {
        alert(`Admin registered successfully! ID: ${response.data.id}`);
        setEmail("");
        setPassword("");
        setAccessCode("");
        navigate("/login"); // Redirect to the login page after successful registration
      } else {
        alert("Failed to register admin.");
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      alert("An error occurred while registering the admin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ececec",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: 4,
          maxWidth: 400,
          width: "90%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Register Admin
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            variant="outlined"
            label="Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle input type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegister}
            disabled={isLoading}
            sx={{
              backgroundColor: "#fff7a4",
              color: "#333",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "gold",
              },
            }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterAdminPage;
