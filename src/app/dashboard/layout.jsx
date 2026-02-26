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
    Button,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

export default function DashboardLayout({ children }) {
    const router = useRouter();

    // ✅ state inside component
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    // ✅ effect inside component
    useEffect(() => {
        setMounted(true);

        const updateCartCount = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cart = JSON.parse(savedCart);
                const total = cart.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(total);
            } else {
                setCartCount(0);
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
            {/* Sidebar */}
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
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "28px",
                            color: "#ff3d6c",
                        }}
                    >
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
                        <ListItemButton onClick={() => router.push("dashboard/categories")}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton onClick={() => router.push("/dashboard/offers")}>
                            <ListItemIcon>
                                <LocalOfferIcon />
                            </ListItemIcon>
                            <ListItemText primary="Offers" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Locations" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Area */}
            <Box sx={{ flexGrow: 1 }}>
                {/* Header */}
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
                            <PersonIcon sx={{ color: "#ff3d6c" }} />
                        </IconButton>

                        <Button
                            startIcon={<LogoutIcon />}
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            sx={{ ml: 1, color: "#ff3d6c", textTransform: "none" }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Page Content */}
                <Box sx={{ pt: `${HEADER_HEIGHT}px` }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
