"use client";

import {
    Paper,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Chip,
} from "@mui/material";
import { Danger } from "iconsax-react";

export default function LowStockCard({ items = [] }) {
    const displayItems = items.length > 0 ? items : [
        { name: "No low stock items", stock: 0 }
    ];

    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                height: 345, // fixed height
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Danger size={20} color="#f44336" variant="Bold" />
                <Typography variant="h6" fontWeight={600}>
                    Low Stock Items
                </Typography>
            </Box>

            {/* Scroll Area */}
            <List
                sx={{
                    flex: 1,
                    overflow: "auto",
                    p: 0,
                }}
            >
                {displayItems.map((item, i) => (
                    <ListItem
                        key={i}
                        sx={{
                            px: 0,
                            py: 1,
                            borderBottom:
                            i < displayItems.length - 1 ? "1px solid #f0f0f0" : "none",
                        }}
                    >
                        <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                        />
                        <Chip
                            label={`${item.stock} left`}
                            size="small"
                            sx={{
                                bgcolor: item.stock <= 2 ? "#ffebee" : "#fff3e0",
                                color: item.stock <= 2 ? "#f44336" : "#ff9800",
                                fontWeight: 600,
                                fontSize: 12,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
