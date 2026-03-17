"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Badge,
    Avatar,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useRouter } from "next/navigation";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

export default function MainLayout({ children }) {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [userInitial, setUserInitial] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("userName");
        if (name) {
            setUserInitial(name.charAt(0).toUpperCase());
        }

        const updateCartCount = async () => {
            const email = localStorage.getItem("email");
            if (!email) return;

            try {
                const res = await fetch(`http://127.0.0.1:8000/cart?email=${encodeURIComponent(email)}`);
                const data = await res.json();
                if (data.items) {
                    const total = data.items.reduce((sum, item) => sum + item.quantity, 0);
                    setCartCount(total);
                } else {
                    setCartCount(0);
                }
            } catch (error) {
                console.error("Cart error:", error);
            }
        };

        const updateWishlistCount = () => {
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                const wishlist = JSON.parse(savedWishlist);
                setWishlistCount(Object.keys(wishlist).length);
            } else {
                setWishlistCount(0);
            }
        };

        updateCartCount();
        updateWishlistCount();

        window.addEventListener("cartUpdated", updateCartCount);
        window.addEventListener("wishlistUpdated", updateWishlistCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
            window.removeEventListener("wishlistUpdated", updateWishlistCount);
        };
    }, []);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafafa" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: SIDEBAR_WIDTH,
                    "& .MuiDrawer-paper": {
                        width: SIDEBAR_WIDTH,
                        boxSizing: "border-box",
                        bgcolor: "#fff",
                        borderRight: "1px solid #e0e0e0",
                    },
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "28px", color: "#ff3d6c" }}>
                        Sweetest!
                    </Typography>
                </Box>

                <List sx={{ px: 2 }}>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton onClick={() => router.push("/dashboard")}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton onClick={() => router.push("/categories")}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton onClick={() => router.push("/offers")}>
                            <ListItemIcon>
                                <LocalOfferIcon />
                            </ListItemIcon>
                            <ListItemText primary="Offers" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => router.push("/location")}>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Locations" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        bgcolor: "#fff",
                        color: "#000",
                        boxShadow: 1,
                        ml: `${SIDEBAR_WIDTH}px`,
                        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                        height: HEADER_HEIGHT,
                        justifyContent: "center",
                    }}
                >
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />

                        <IconButton onClick={() => router.push("/cart")}>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon sx={{ color: "#ff3d6c" }} />
                            </Badge>
                        </IconButton>

                        <IconButton onClick={() => router.push("/wishlist")}>
                            <Badge badgeContent={wishlistCount} color="error">
                                <FavoriteIcon sx={{ color: "#ff3d6c" }} />
                            </Badge>
                        </IconButton>

                        <IconButton onClick={() => router.push("/profile")}>
                            <Avatar
                                sx={{
                                    bgcolor: "#ff3d6c",
                                    width: 32,
                                    height: 32,
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                {userInitial}
                            </Avatar>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ pt: `${HEADER_HEIGHT}px` }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
