"use client";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Card, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState({});
    const router = useRouter();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("wishlist")) || {};
        setWishlistItems(data);
    }, []);

    const isEmpty = Object.keys(wishlistItems).length === 0;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f5f5",
                px: { xs: 2, md: 8 },
                py: 4,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                }}
            >
                {/* Back Button - ALWAYS */}
                <IconButton
                    onClick={() => router.back()}
                    sx={{
                        position: "absolute",
                        left: 0,
                        bgcolor: "#ff3d6c",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        "&:hover": { bgcolor: "#e7335f" },
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 18, color: "#fff" }} />
                </IconButton>

                {/* Title - ONLY WHEN ITEMS */}
                {!isEmpty && (
                    <Typography
                        sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: "#ff3d6c",
                        }}
                    >
                        Your Wishlist ❤️
                    </Typography>
                )}
            </Box>

            {/* Empty State */}
            {isEmpty ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 10,
                        opacity: 0.9,
                    }}
                >
                    <Box
                        component="img"
                        src="/wishlist.png" // put inside public folder
                        alt="Empty wishlist"
                        sx={{
                            width: { xs: 220, md: 320 },
                            mb: 2,
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#ff3d6c",
                        }}
                    >
                        Your wishlist is empty
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "#777",
                            mt: 0.5,
                        }}
                    >
                        Add items you love ❤️
                    </Typography>
                </Box>
            ) : (
                /* Items */
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        justifyContent: "center",
                    }}
                >
                    {Object.entries(wishlistItems).map(([key, item]) => (
                        <Card
                            key={key}
                            sx={{
                                width: { xs: "100%", md: "35%" },
                                height: 180,
                                display: "flex",
                                p: 2,
                                borderRadius: 3,
                                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                position: "relative",
                            }}
                        >
                            {/* Image */}
                            <Box
                                component="img"
                                src={item.image || "/cupcake.jpg"}
                                alt={item.name}
                                sx={{
                                    width: 140,
                                    minWidth: 140,
                                    height: "100%",
                                    borderRadius: 2,
                                    objectFit: "cover",
                                }}
                            />

                            {/* Content */}
                            <Box
                                sx={{
                                    ml: 2,
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                                        {item.name}
                                    </Typography>

                                    <Typography sx={{ fontSize: 13, color: "#777", mt: 0.5 }}>
                                        Bakery • Desserts
                                    </Typography>

                                    {/* Rating */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mt: 1,
                                        }}
                                    >
                                        <StarIcon sx={{ color: "#ffa000", fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 13 }}>
                                            {item.rating || "4.5"}
                                        </Typography>
                                        <Typography sx={{ fontSize: 13, color: "#777" }}>
                                            • 30–40 mins
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Price + Order */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 700, color: "#ff3d6c" }}>
                                        ₹{item.price}
                                    </Typography>

                                    <Button
                                        size="small"
                                        sx={{
                                            bgcolor: "#ff3d6c",
                                            color: "#fff",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            "&:hover": { bgcolor: "#e7335f" },
                                        }}
                                    >
                                        Order Now
                                    </Button>
                                </Box>
                            </Box>

                            {/* Remove */}
                            <IconButton
                                onClick={() => {
                                    const updated = { ...wishlistItems };
                                    delete updated[key];
                                    setWishlistItems(updated);
                                    localStorage.setItem(
                                        "wishlist",
                                        JSON.stringify(updated)
                                    );
                                }}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bgcolor: "#fff",
                                }}
                            >
                                <FavoriteIcon sx={{ color: "#e53935" }} />
                            </IconButton>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}
