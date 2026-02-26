"use client";

import { Paper, Box, Typography, List, ListItem, ListItemText, Rating } from "@mui/material";
import { Star1 } from "iconsax-react";

export default function CustomerReviewCard({ reviews = [] }) {
    const displayReviews = reviews.length > 0 ? reviews : [];
    const avgRating = displayReviews.length > 0 
        ? (displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1)
        : "0.0";

    return (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", height: 345, display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Star1 size={20} color="#ffc107" variant="Bold" />
                <Typography variant="h6" fontWeight={600}>Customer Reviews</Typography>
                <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="h6" fontWeight={700} color="#ffc107">{avgRating}</Typography>
                    <Rating value={parseFloat(avgRating)} precision={0.1} size="small" readOnly />
                </Box>
            </Box>

            <List sx={{ flex: 1, overflow: "auto", p: 0 }}>
                {displayReviews.length > 0 ? (
                    displayReviews.map((review, i) => (
                        <ListItem key={i} sx={{ px: 0, py: 1.5, borderBottom: i < displayReviews.length - 1 ? "1px solid #f0f0f0" : "none", alignItems: "flex-start" }}>
                            <Box sx={{ width: "100%" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                    <Typography fontSize={14} fontWeight={600}>{review.customer}</Typography>
                                    <Rating value={review.rating} size="small" readOnly sx={{ fontSize: 14 }} />
                                </Box>
                                <Typography component="div" fontSize={13} color="text.primary" sx={{ mb: 0.5 }}>
                                    {review.comment}
                                </Typography>
                                <Typography component="div" fontSize={11} color="text.secondary">
                                    {review.date}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Typography color="text.secondary" fontSize={14}>No reviews yet</Typography>
                    </Box>
                )}
            </List>
        </Paper>
    );
}
