import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Button, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';

// Sample data for users and recent activity
const initialUsers = [
  { id: 1, name: '_Asmir', role: 'Admin' },
  { id: 2, name: '_Begovic', role: 'User' },
  { id: 3, name: '_Eden', role: 'User' },
];

const recentQuotes = [
  { id: 1, customer: '_roman', amount: 450 },
  { id: 2, customer: '_liman', amount: 700 },
  { id: 3, customer: '_elkana', amount: 300 },
];

const popularConfigurations = [
  { id: 1, configuration: 'Polycarbonate Roof - Manual Control' },
  { id: 2, configuration: 'Glass Roof - Remote Control' },
];

const Settings = () => {
  const [users, setUsers] = useState(initialUsers);

  // Handler to update user role
  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => (user.id === id ? { ...user, role: newRole } : user)));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Settings</Typography>

      {/* User Management Section */}
      <Typography variant="h6" sx={{ mt: 3 }}>User Management</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={user.name} secondary={`Role: ${user.role}`} />
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      {/* Real-Time Statistics */}
      <Typography variant="h6">Recent Activity</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Recent Quotes</Typography>
        <List>
          {recentQuotes.map(quote => (
            <ListItem key={quote.id}>
              <ListItemText primary={`Customer: ${quote.customer}`} secondary={`Amount: ${quote.amount}`} />
            </ListItem>
          ))}
        </List>
        
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Popular Configurations</Typography>
        <List>
          {popularConfigurations.map(config => (
            <ListItem key={config.id}>
              <ListItemText primary={config.configuration} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Settings;
