import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity ("success", "error", etc.)

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbarMessage("Please enter your email and password.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("https://alfresko-apis.vercel.app/api/v1/loginuser", {
        email,
        password,
      });

      if (response.status >= 200 && response.status < 300) {
        const { accessToken, refreshToken } = response.data;

        // Save tokens in local storage or secure storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
       

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarMessage("Login failed. Please check your credentials and try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = () => {
    navigate("/register-admin"); // Redirect to the register admin page
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
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



<Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Snackbar auto-hide time in milliseconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position of the Snackbar
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity} // Severity determines the color (success, error, etc.)
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

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
          Admin Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff7a4",
              },
            }}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "lightblue",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Need to create an admin account?{" "}
            <Link
              component="button"
              onClick={handleCreateAdmin}
              sx={{ color: "#007bff", cursor: "pointer" }}
            >
              Create Admin
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
