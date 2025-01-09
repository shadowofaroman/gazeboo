import React, { useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const HorizontalScrollButton = ({ tableContainerId }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    scrollContainerRef.current = document.getElementById(tableContainerId);
  }, [tableContainerId]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80px", // Combined width for both actions
        height: "40px",
        backgroundColor: "#FFD700", // Yellow base color
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "20px", // Pill-shaped design
        overflow: "hidden", // Clip contents for ridge effect
        border: "2px solid #FFC107", // Subtle border
        "&:hover": {
          backgroundColor: "#FFC107", // Slightly darker yellow on hover
        },
      }}
    >
      {/* Backward Section */}
      <Button
        onClick={scrollLeft}
        sx={{
          flex: 1, // Equal split between left and right
          height: "100%",
          backgroundColor: "#FFD700",
          borderRight: "2px solid #FFC107", // Ridge-like separator
          borderRadius: 0, // No individual corners
          "&:hover": { backgroundColor: "#FFB700" },
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "20px", color: "#000" }} />
      </Button>

      {/* Forward Section */}
      <Button
        onClick={scrollRight}
        sx={{
          flex: 1, // Equal split between left and right
          height: "100%",
          backgroundColor: "#FFD700",
          borderRadius: 0, // No individual corners
          "&:hover": { backgroundColor: "#FFB700" },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: "20px", color: "#000" }} />
      </Button>
    </Box>
  );
};

export default HorizontalScrollButton;
