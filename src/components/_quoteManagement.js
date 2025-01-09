import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Collapse from "@mui/material/Collapse";
import HorizontalScrollButton from "./_horizOntal";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const QuoteManagement = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRow, setOpenRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("timeline");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Manage dialog visibility
  const [quoteToDelete, setQuoteToDelete] = useState(null); // Track which quote is being deleted
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [quoteToUpdate, setQuoteToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://alfresko-apis.vercel.app/api/v1/quotes");
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setQuotes(sortedData);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const handleStatusChange = async () => {
    if (!quoteToUpdate || !newStatus) return;
  
    try {
      const payload = { id: quoteToUpdate, status: newStatus };
  
      const response = await fetch("https://alfresko-apis.vercel.app/api/v1/quotestatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating status: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      if (responseData.message === "success") {
        setSuccessMessage("Quote deleted successfully!"); // Set a meaningful success message
        setSnackbarOpen(true); 
      }
  
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote.id === quoteToUpdate ? { ...quote, status: newStatus } : quote
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      handleCloseStatusDialog();
    }
  };





  const handleDeleteQuote = async () => {
    if (!quoteToDelete) return;
  
    try {
      const response = await fetch(`https://alfresko-apis.vercel.app/api/v1/1/quote`, {
        method: "DELETE",
      });
      console.log(response);
  
      if (!response.ok) throw new Error(`Error deleting quote: ${response.statusText}`);

      let responseData = {};
      if (response.status !== 204) {
        responseData = await response.json(); // Only parse JSON if status is not 204
      }

      

      if ( response.status === 204 || responseData.message === "success") {
        setSuccessMessage(responseData.message); // Set success message
        setSnackbarOpen(true); // Show Snackbar
      }
  
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== quoteToDelete));
      
    } catch (error) {
      console.error("Failed to delete quote:", error);
      alert("Failed to delete the quote. Please try againnn.");
    } finally {
      handleCloseDeleteDialog(); // Close the dialog
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setQuoteToDelete(id); // Store the quote ID
    setDeleteDialogOpen(true); // Open the dialog
  };
  
  const handleCloseDeleteDialog = () => {
    setQuoteToDelete(null); // Clear the stored quote ID
    setDeleteDialogOpen(false); // Close the dialog
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id) // Deselect
        : [...prevSelected, id] // Select
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(quotes.map((quote) => quote.id)); // Select all row IDs
    } else {
      setSelectedRows([]); // Deselect all
    }
  };

  const sortQuotes = (data, criteria) => {
    if (criteria === "timeline") {
      return [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    if (criteria === "name") {
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (criteria === "price") {
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    }
    return data;
  };

  const handleSortChange = (event) => {
    const selectedCriteria = event.target.value;
    setSortCriteria(selectedCriteria);

    // Apply sorting
    const sortedData = sortQuotes(quotes, selectedCriteria);
    setQuotes(sortedData);
  };

  const handleOpenStatusDialog = (id, status) => {
    setQuoteToUpdate(id);
    setNewStatus(status);
    setStatusDialogOpen(true);
  };
  
  const handleCloseStatusDialog = () => {
    setQuoteToUpdate(null);
    setNewStatus("");
    setStatusDialogOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return; // Prevent accidental dismissal
    setSnackbarOpen(false);
  };

  

 

  

  return (
    <Box>

<Dialog
  open={deleteDialogOpen}
  onClose={handleCloseDeleteDialog}
  aria-labelledby="delete-dialog-title"
  aria-describedby="delete-dialog-description"
>
  <DialogTitle id="delete-dialog-title">Delete Quote</DialogTitle>
  <DialogContent>
    <Typography>
      Do you wish to delete this quote? <br />
      This action cannot be undone.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleDeleteQuote} color="error" autoFocus>
      Delete
    </Button>
  </DialogActions>
</Dialog>



<Dialog
  open={statusDialogOpen}
  onClose={handleCloseStatusDialog}
  aria-labelledby="status-dialog-title"
  aria-describedby="status-dialog-description"
>
  <DialogTitle id="status-dialog-title">Change Status</DialogTitle>
  <DialogContent>
    <Typography>
      Do you want to change the status to "{newStatus}"? <br />
      This action will update the quote status.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseStatusDialog} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleStatusChange} color="primary" autoFocus>
      Confirm
    </Button>
  </DialogActions>
</Dialog>

<Snackbar
  open={snackbarOpen}
  autoHideDuration={3000} // 3 seconds
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjust position to top-center
  sx={{
    position: "fixed",
    top: "20%", // Adjust to bring it slightly lower than the top of the viewport
    left: "50%",
    transform: "translateX(-50%)", // Center horizontally
    zIndex: 1400, // Ensure it stays above other elements
  }}
>
  <Alert
    onClose={handleSnackbarClose}
    severity="success"
    sx={{
      width: "300px", // Consistent size
      fontSize: "0.9rem", // Adjust text size
      textAlign: "center", // Center align text
    }}
  >
    {successMessage || "Quote deleted"}
  </Alert>
</Snackbar>





      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Quote Management
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ position: "relative" }}>
          {!isMobile && <HorizontalScrollButton tableContainerId="table-container" />}
        {/* Horizontal Scroll Buttons */}
        <HorizontalScrollButton tableContainerId="table-container" />


  <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
            <Select value={sortCriteria} onChange={handleSortChange}>
            <MenuItem value="name">🔠 From A to Z</MenuItem>
            <MenuItem value="price">💶 Top Prices First </MenuItem>
            <MenuItem value="timeline">⏳ Newest First</MenuItem>

            </Select>
          </Box>

         
             <Box
               id="table-container" // Add an ID for reference
               sx={{
                 display: "flex",
                 overflowX: "auto", // Enable horizontal scrolling
                 whiteSpace: "nowrap", // Prevent wrapping of table rows
                 width: "100%", // Make it responsive
               }}
             >
            <Table sx={{ minWidth: 1200, borderCollapse: "collapse", border: "10px solid #e0e0e0" }}>
              <TableHead>
                <TableRow>
                <TableCell>
                   <input
                     type="checkbox"
                     onChange={handleSelectAll} // Select or deselect all rows
                     checked={selectedRows.length === quotes.length && quotes.length > 0} // Check if all rows are selected
                   />
                 </TableCell>
                  {["#", "👤 Name", "💰 Pri€e", "📧 Em@il", "📞 Phone", "🏠 Budget", "📋 Status", "⚙️ Actions"].map((header, idx) => (
                    <TableCell
                      key={idx}
                      sx={{
                        padding: "20px 1px",
                        fontWeight: "bold",
                        borderBottom: "20px solid #e0e0e0",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {quotes.map((quote, index) => (
                  <React.Fragment key={index}>

                
                    {/* Main Row */}
                    <TableRow
                      sx={{
                        borderBottom: "1px solid #e0e0e0",
                        "&:hover": {
                          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => setOpenRow(openRow === index ? null : index)} // Toggle the row
                    >

                   <TableCell>
                             <input
                               type="checkbox"
                               checked={selectedRows.includes(quote.id)} // Check if this row is selected
                               onChange={(e) => {
                                 e.stopPropagation(); // Prevent row toggle on checkbox click
                                 toggleRowSelection(quote.id);
                               }} // Select or deselect this row
                            />
                          </TableCell>
                      {/* Index */}
                      <TableCell sx={{ padding: "8px 10px", minWidth: "60px", whiteSpace: "nowrap" }}>
                        {index + 1}
                      </TableCell>

                      {/* Name */}
                      <TableCell
                        sx={{
                          padding: "8px 10px",
                          minWidth: "200px",
                          whiteSpace: "nowrap",
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        {quote.name}
                      </TableCell>

                      <TableCell
                        sx={{
                          padding: "8px 10px",
                          minWidth: "200px",
                          whiteSpace: "nowrap",
                          color: "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {quote.price}
                      </TableCell>

                      {/* Email */}
                      <TableCell
                        sx={{
                          padding: "8px 10px",
                          minWidth: "200px",
                          whiteSpace: "nowrap",
                          color: "blue",
                        }}
                      >
                        {quote.email}
                      </TableCell>

                      {/* Phone */}
                      <TableCell
                        sx={{
                          padding: "8px 10px",
                          minWidth: "150px",
                          whiteSpace: "nowrap",
                          color: "purple",
                        }}
                      >
                        {quote.phone}
                      </TableCell>

                      {/* Canopy Type */}
                      <TableCell sx={{ padding: "8px 10px", minWidth: "150px", whiteSpace: "nowrap" }}>
                        {quote.budget}
                      </TableCell>

                      {/* Status Dropdown */}
                      <TableCell sx={{ padding: "8px 10px", minWidth: "200px" }}>
                        <select
                          value={quote.status || ""}
                          onChange={(e) => handleOpenStatusDialog(quote.id, e.target.value)}
                          style={{
                            padding: "6px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            border: "1px solid #ccc",
                            width: "100%",
                            backgroundColor:
                              quote.status === "complete"
                                ? "#28a745"
                                : quote.status === "pending"
                                ? "#ffc107"
                                : quote.status === "contacted"
                                ? "#dc3545"
                                 : quote.status === "left message"
                                ? "#6c757d"
                                 : quote.status === "survey booked"
                                ? "#17a2b8"
                                 : quote.status === "survey completed"
                                ? "#6610f2"
                                 : quote.status === "revised estimate sent"
                                ? "#fd7e14"
                                 : quote.status === "sale agreed"
                                ? "#28a745"
                                 : quote.status === "invoiced"
                                ? "#20c997"
                                 : quote.status === "payment received"
                                ? "#198754"
                                 : quote.status === "ordered"
                                ? "#ffc107"
                                 : quote.status === "installed"
                                ? "#0dcaf0"
                                
                                : "#dc3545",
                          }}
                        >
                          {["pending", "contacted", "left message",
                           "survey booked", "survey completed", "revised estimate sent",
                            "sale agreed", "invoiced", "payment received", "ordered", "installed", "complete"].map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </TableCell>

                      {/* Actions */}
                      <TableCell sx={{ padding: "8px 10px", minWidth: "200px" }}>
                        <Button variant="text" onClick={() => setOpenRow(openRow === index ? null : index)}>
                          <Tooltip title="View Details">
                            Details
                          </Tooltip>
                        </Button>
                      </TableCell>
                    </TableRow>

                   

                    {/* Collapsible Row */}
                    <TableRow>
                      <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                              <strong>Address:</strong> {quote.address}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                              <strong>Canopy:</strong> {quote.canopyType}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                              <strong>Dimensions:</strong> {quote.dimensions}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                              <strong>Roof:</strong> {quote.rooffeature}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                              <strong>Roof Blinds:</strong> {quote.roofBlinds}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                              <strong>Wall Features:</strong> {quote.wallfeatures?.map((wall, i) => `${i + 1}: ${wall.description}`).join(", ") || "None"}
                            </Typography>
                             <Typography variant="body2">
                             <strong>Installation:</strong> {quote.installation === true ? "Yes" : quote.installation === false ? "No" : "None"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Additional Features:</strong> {quote.additionalfeatures || "None"}
                            </Typography>
                           
                           
                            <Button
                             variant="text"
                             onClick={() => handleOpenDeleteDialog(quote.id)}
                           >
                             <Tooltip title="Delete this quote">
                               <DeleteIcon style={{ color: "red" }} />
                             </Tooltip>
                           </Button>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuoteManagement;
