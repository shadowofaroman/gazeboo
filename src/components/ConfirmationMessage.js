import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ConfirmationMessage = ({ visible, onConfirm, onCancel, newStatus }) => {
  if (!visible) return null; // Render nothing if not visible

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        p: 3,
        width: "300px",
        borderRadius: "12px",
        boxShadow: 4,
        background: "linear-gradient(to right, #fff7a4, #ffe08d)", // Gradient background
        color: "#333",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Confirm Status Change
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Do you want to change the status to <strong>{newStatus}</strong>?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            backgroundColor: "#4caf50", // Green for confirmation
            "&:hover": { backgroundColor: "#45a049" },
          }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={onCancel}
          sx={{
            backgroundColor: "#f44336", // Red for cancel
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          No
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationMessage;
