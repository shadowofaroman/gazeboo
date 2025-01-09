import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";


const Settings = () => {
  const [profileName, setProfileName] = useState("John Doe"); // Profile name
  const [email, setEmail] = useState("johndoe@example.com"); // Email
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Email notifications
 // const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
 const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
 const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
 const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity ("success", "error", etc.)

  const handleSaveChanges = () => {
    console.log("Settings saved:", {
      profileName,
      email,
      notificationsEnabled,
      
    });
    setSnackbarMessage("Settings saved successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setSnackbarMessage("You have been logged out!");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return; // Prevent accidental dismissal
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4, position: "relative" }}>

       {/* Snackbar for messages */}
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
      {/* Creative Under Construction Banner */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "#ff9800",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          animation: "pulse 2s infinite",
        }}
      >
        🤖 Robots are currently very busy building this site. Please stand by! 🚧
      </Box>

      {/* Keyframes for animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: translateX(-50%) scale(1);
            }
            50% {
              transform: translateX(-50%) scale(1.1);
            }
            100% {
              transform: translateX(-50%) scale(1);
            }
          }
        `}
      </style>

      {/* Settings Content */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Settings
      </Typography>

      {/* Profile Settings */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Profile Settings
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Paper>

      {/* Notifications */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
          }
          label={
            notificationsEnabled
              ? "Email Notifications Enabled"
              : "Email Notifications Disabled"
          }
        />
      </Paper>

      {/* Security */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Security
        </Typography>
        <Button variant="outlined">Change Password</Button>
      </Paper>

      {/* Account Information */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Account Information
        </Typography>
        <Typography variant="body2">Account Status: Active</Typography>
        <Typography variant="body2">Member Since: January 1, 2025</Typography>
      </Paper>

      {/* Privacy */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Privacy
        </Typography>
        <FormControlLabel
          control={<Switch />}
          label="Show Profile Publicly"
        />
      </Paper>

      {/* Save Changes */}
      <Divider sx={{ mb: 2 }} />
      <Button
        variant="contained"
        onClick={handleSaveChanges}
        sx={{
          mt: 2,
          bgcolor: "#918829",
          "&:hover": {
            bgcolor: "#776c1d",
          },
        }}
      >
        Save Changes
      </Button>

      {/* Logout Button */}
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{
          mt: 2,
          ml: 2,
          bgcolor: "#918829",
          "&:hover": {
            bgcolor: "#776c1d",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Settings;
