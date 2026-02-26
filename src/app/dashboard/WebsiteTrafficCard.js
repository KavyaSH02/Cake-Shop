"use client";

import { Paper, Box, Typography, Divider } from "@mui/material";
import { Global, Eye, ArrowUp } from "iconsax-react";

export default function WebsiteTrafficCard({ data = {} }) {
    const hasData = data && Object.keys(data).length > 0;
    
    const stats = {
        totalViews: data?.totalViews || 0,
        todayViews: data?.todayViews || 0,
        uniqueVisitors: data?.uniqueVisitors || 0,
        growthPercent: data?.growthPercent || 0
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", height: 345, display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Global size={20} color="#3f51b5" variant="Bold" />
                <Typography variant="h6" fontWeight={600}>Website Traffic</Typography>
            </Box>

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                {hasData ? (
                    <>
                        {/* Total Views */}
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                <Eye size={18} color="#3f51b5" />
                                <Typography fontSize={12} color="text.secondary">Total Page Views</Typography>
                            </Box>
                            <Typography fontSize={32} fontWeight={700} color="#3f51b5">
                                {stats.totalViews.toLocaleString()}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                                <ArrowUp size={14} color="#4caf50" />
                                <Typography fontSize={12} color="#4caf50" fontWeight={600}>
                                    +{stats.growthPercent}% this month
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Today & Unique Visitors */}
                        <Box sx={{ display: "flex", gap: 4 }}>
                            <Box sx={{ minWidth: 120 }}>
                                <Typography component="div" fontSize={12} color="text.secondary" mb={0.5}>Today's Views</Typography>
                                <Typography component="div" fontSize={24} fontWeight={700} color="#ff9800">
                                    {stats.todayViews}
                                </Typography>
                            </Box>
                            <Box sx={{ minWidth: 120 }}>
                                <Typography component="div" fontSize={12} color="text.secondary" mb={0.5}>Unique Visitors</Typography>
                                <Typography component="div" fontSize={24} fontWeight={700} color="#9c27b0">
                                    {stats.uniqueVisitors.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Typography color="text.secondary" fontSize={14}>No traffic data available</Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
}
