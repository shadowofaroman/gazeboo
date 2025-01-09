import React, { useRef } from "react";
import { Box, Button } from "@mui/material";

const NextButton = () => {
  const scrollContainerRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Scrollable container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          padding: 2,
        }}
      >
        {/* Example content */}
        {[...Array(10)].map((_, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 300,
              height: 200,
              backgroundColor: "#f0f0f0",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Page {index + 1}
          </Box>
        ))}
      </Box>

      {/* Persistent Scroll Buttons */}
      <Button
        onClick={handleScrollLeft}
        sx={{
          position: "fixed", // Fixed to hover persistently
          left: 10, // Distance from the left edge of the screen
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "#ffffff", // Add some background for visibility
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow
          "&:hover": { backgroundColor: "#f0f0f0" }, // Hover effect
        }}
      >
        ←
      </Button>
      <Button
        onClick={handleScrollRight}
        sx={{
          position: "fixed", // Fixed to hover persistently
          right: 10, // Distance from the right edge of the screen
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "#ffffff", // Add some background for visibility
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional shadow
          "&:hover": { backgroundColor: "#f0f0f0" }, // Hover effect
        }}
      >
        →
      </Button>
    </Box>
  );
};

export default NextButton;
