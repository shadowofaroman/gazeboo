import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box, Divider, IconButton } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductConfiguration from './components/_productConfiguration';
import Settings from './components/_settings';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BuildIcon from '@mui/icons-material/Build';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { grey } from '@mui/material/colors';

const drawerWidth = 260;

const Dashboard = () => {
  const [sections] = useState([
    { title: "Dashboard", path: "/", icon: <HomeIcon /> },
    { title: "Product Configuration", path: "/product-configuration", icon: <BuildIcon /> },
    { title: "Quote Management", path: "/quote-management", icon: <ListAltIcon /> },
    { title: "Order Tracking", path: "/order-tracking", icon: <TrackChangesIcon /> },
    { title: "Extras Management", path: "/extras-management", icon: <BuildIcon /> },
    { title: "User Management", path: "/user-management", icon: <SupervisorAccountIcon /> },
    { title: "Settings", path: "/settings", icon: <SettingsIcon /> }
  ]);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ 
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: grey[900]
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: grey[800],
              color: 'white'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', margin: 'auto' }}>
              Your Logo
            </Typography>
          </Toolbar>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {sections.map((section) => (
                <ListItem button key={section.title} component={Link} to={section.path} sx={{ color: 'white' }}>
                  <IconButton sx={{ color: 'white', mr: 2 }}>{section.icon}</IconButton>
                  <ListItemText primary={section.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: grey[100], p: 3, minHeight: '100vh' }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Typography variant="h4">Welcome to the admin dashboard!</Typography>} />
            <Route path="/product-configuration" element={<ProductConfiguration />} />
            <Route path="/quote-management" element={<Typography>Quote Management Page</Typography>} />
            <Route path="/order-tracking" element={<Typography>Order Tracking Page</Typography>} />
            <Route path="/extras-management" element={<Typography>Extras Management Page</Typography>} />
            <Route path="/user-management" element={<Typography>User Management Page</Typography>} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default Dashboard;
