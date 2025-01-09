import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


// Helper function to group data by month and year
const groupDataByMonth = (data) => {
  const groupedData = {};

  // Process each order
  data.forEach((order) => {
    const date = new Date(order.created_at);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
    const key = `${month} ${year}`; // Combine month and year

    if (!groupedData[key]) groupedData[key] = 0;
    groupedData[key] += 1;
  });

  // Convert the grouped data into an array and sort by date
  return Object.entries(groupedData)
    .map(([name, orders]) => ({ name, orders }))
    .sort((a, b) => {
      const [monthA, yearA] = a.name.split(" ");
      const [monthB, yearB] = b.name.split(" ");
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      return (
        parseInt(yearA) - parseInt(yearB) || months.indexOf(monthA) - months.indexOf(monthB)
      );
    });
};

// Dashboard Charts Component
const DashboardCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("https://alfresko-apis.vercel.app/api/v1/quotes");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const processedData = groupDataByMonth(data); // Group data by month and year
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Box>
      {/* Dashboard Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
          background: "linear-gradient(90deg, #CFB53B, #FFD700)", // Gold gradient text effect
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        Alfresko Insights 
      </Typography>

      {/* Main Chart Section */}
      <Box
        sx={{
          height: 450,
          bgcolor: "#FFFFFF",
          borderRadius: 3,
          boxShadow: 4,
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with Tooltip and Action */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ color: "#808080", fontWeight: "bold" }}>
            📈 Monthly Quotes Overview
          </Typography>
         
        </Box>

        {/* Chart or Loader */}
        {loading ? (
          <CircularProgress
            sx={{
              display: "block",
              margin: "auto",
              color: "#CFB53B", // Gold loader color
              animation: "pulse 2s infinite",
            }}
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#CFB53B" // Gold line
                strokeWidth={2}
                dot={{ r: 6, fill: "#FFD700", strokeWidth: 2 }} // Highlighted dots
                activeDot={{ r: 8 }}
              />
              <CartesianGrid stroke="#E0E0E0" strokeDasharray="5 5" />
              <XAxis dataKey="name" tick={{ fill: "#808080" }} />
              <YAxis tick={{ fill: "#808080" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF8DC",
                  border: "1px solid #CFB53B",
                  color: "#000",
                }}
                itemStyle={{ color: "#333" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default DashboardCharts;
