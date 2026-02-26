"use client";

import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { Bag2, TrendUp, Eye } from "iconsax-react";
import DashboardStatCard from "./DashboardStatCard";
import RevenueChart from "./RevenueChart";
import LowStockCard from "./LowStockCard";
import CustomerReviewCard from "./CustomerReviewCard";
import WebsiteTrafficCard from "./WebsiteTrafficCard";

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from backend API
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch dashboard stats");
                return res.json();
            })
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                <CircularProgress sx={{ color: "#ff3d6c" }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const cards = [
        {
            title: "Orders Today",
            value: stats?.ordersToday || 0,
            icon: <Bag2 size={28} color="#ff3d6c" variant="Bold" />,
            color: "#ff3d6c",
        },
        {
            title: "Orders This Month",
            value: stats?.ordersThisMonth || 0,
            icon: <Bag2 size={28} color="#ff6b9d" variant="Bold" />,
            color: "#ff6b9d",
        },
        {
            title: "Most Ordered",
            value: stats?.mostOrdered?.name || "N/A",
            subtitle: `${stats?.mostOrdered?.count || 0} orders`,
            icon: <TrendUp size={28} color="#9c27b0" variant="Bold" />,
            color: "#9c27b0",
        },

    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h5"
                fontWeight={700}
                mb={4}
                sx={{ color: "#0e0708" }}
            >
                What’s Happening Today
            </Typography>



            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <DashboardStatCard {...card} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <RevenueChart data={stats?.revenueData} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <LowStockCard items={stats?.lowStockItems} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <CustomerReviewCard reviews={stats?.customerReviews} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <WebsiteTrafficCard data={stats?.websiteTraffic} />
                </Grid>
            </Grid>

        </Box>
    );
}
