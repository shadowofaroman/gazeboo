import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CssBaseline,
  Box,
  Divider,
} from "@mui/material";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Navigate } from "react-router-dom";

import DashboardCharts from "./components/_dashboardChart";
import QuoteManagement from "./components/_quoteManagement";
import Settings from "./components/_settings";

const drawerWidth = 260;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is mobile
  const [mobileOpen, setMobileOpen] = useState(false); // Drawer toggle state for mobile
  const location = useLocation(); // Get the current path

  const sections = [
    { title: "Dashboard", path: "dashboard", icon: <HomeIcon /> },
    { title: "Quote Management", path: "quote-management", icon: <ListAltIcon /> },
    { title: "Settings", path: "settings", icon: <SettingsIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/Alfresko_logo.jpg" // Path to your logo
          alt="Alfresko Logo"
          sx={{
            height: 70,
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
        {isMobile && (
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
  {sections.map((section) => {
    const isSelected = location.pathname === `/${section.path}`; // Check if the current path matches

    return (
      <ListItem
        button
        key={section.title}
        component={Link}
        to={section.path}
        onClick={handleDrawerClose} // Close drawer after navigation
        sx={{
          backgroundColor: isSelected ? "#000000" : "transparent", // Black background for selected
          "&:hover": {
            backgroundColor: isSelected ? "#000000" : "#918829", // Retain black for selected, add hover for others
          },
          color: isSelected ? "#CFB53B" : "#000000", // White text for selected, black for others
          fontWeight: isSelected ? "bold" : "normal", // Optional: Bold text for selected item
          borderRadius: 1, // Optional: Add a border-radius for better aesthetics
          transition: "background-color 0.3s ease", // Smooth transition effect
        }}
      >
        <IconButton sx={{ mr: 2, color: "inherit" }}>{section.icon}</IconButton>
        <ListItemText primary={section.title} />
      </ListItem>
    );
  })}
</List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
       position="fixed"
       sx={{
         width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
         ml: isMobile ? 0 : `${drawerWidth}px`,
         bgcolor: "#808080", // Change background color to Grey (#808080)
         color: "#FFFFFF", // Text color: clean white
       }}
      >
        <Toolbar>
          {isMobile && ( // Hamburger menu only on mobile
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      {isMobile ? ( // Temporary Drawer for Mobile
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      ) : ( // Permanent Drawer for Desktop
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9f9f9",
          p: 3,
          minHeight: "100vh",
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Routes>
  <Route path="dashboard" element={<DashboardCharts />} />
  <Route path="quote-management" element={<QuoteManagement />} />
  <Route path="settings" element={<Settings />} />
  <Route path="*" element={<Navigate to="dashboard" />} /> {/* Redirect unknown paths */}
</Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
