"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";

export default function DashboardStatCard({
    title,
    value,
    subtitle,
    icon,
}) {
    return (
        <Card
            sx={{
                boxShadow: 3,
                borderRadius: 2,
                height: "100%",
            }}
        >
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {/* Plain icon */}
                    <Box sx={{ mr: 2, display: "flex" }}>
                        {icon}
                    </Box>

                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        {title}
                    </Typography>
                </Box>

                <Typography variant="h5" fontWeight={700}>
                    {value}
                </Typography>

                {subtitle && (
                    <Typography variant="caption" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
