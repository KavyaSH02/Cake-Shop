"use client";

import { Box, Typography, Grid } from "@mui/material";
import { Bag2, TrendUp } from "iconsax-react";
import { useState, useEffect } from "react";
import DashboardStatCard from "./DashboardStatCard";
import RevenueChart from "./RevenueChart";
import LowStockCard from "./LowStockCard";
import CustomerReviewCard from "./CustomerReviewCard";
import WebsiteTrafficCard from "./WebsiteTrafficCard";

export default function DashboardPage() {

  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    ordersToday: 0,
    ordersThisMonth: 0,
    mostOrderedItem: ""
  });

  const [email, setEmail] = useState(null);

  useEffect(() => {
    setMounted(true);
    const userEmail = localStorage.getItem("email");
    setEmail(userEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    fetch(`http://127.0.0.1:8000/dashboard/stats?email=${email}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, [email]);

  if (!mounted) return null; // prevents hydration mismatch

  const cards = [
    {
      title: "Orders Today",
      value: stats.ordersToday,
      icon: <Bag2 size={28} color="#ff3d6c" variant="Bold" />,
      color: "#ff3d6c",
    },
    {
      title: "Orders This Month",
      value: stats.ordersThisMonth,
      icon: <Bag2 size={28} color="#ff6b9d" variant="Bold" />,
      color: "#ff6b9d",
    },
    {
      title: "Most Ordered",
      value: stats.mostOrderedItem || "N/A",
      icon: <TrendUp size={28} color="#9c27b0" variant="Bold" />,
      color: "#9c27b0",
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={4} sx={{ color: "#0e0708" }}>
        What’s Happening Today
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardStatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RevenueChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LowStockCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomerReviewCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <WebsiteTrafficCard />
        </Grid>
      </Grid>
    </Box>
  );
}