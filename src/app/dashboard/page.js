"use client";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Badge,
  Container,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useRouter } from "next/navigation";


export default function CakeUI() {
  const [wishlist, setWishlist] = useState([false]);
  const [currentImage, setCurrentImage] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
      }
    };
    
    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Check for cart updates periodically
    const interval = setInterval(updateCartCount, 1000);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const images = [
    "/honey-cake.jpg",
    "/fruit.png",
    "/biscuit.JPG",
    "/choc.jpg",
    "/cupcake.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images.length]);



  const toggleWishlist = (i) => {
    const updated = [...wishlist];
    updated[i] = !updated[i];
    setWishlist(updated);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#fafafa", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
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
              fontSize: "32px",
              color: "#ff3d6c",
            }}
          >
            Sweetest!
          </Typography>
        </Box>
        <List sx={{ px: 2 }}>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2, bgcolor: "#ffe5ec" }}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#ff3d6c" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }} onClick={() => router.push("/categories")}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Offers" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Navigation Bar */}
        <AppBar
          position="sticky"
          sx={{ bgcolor: "#fff", boxShadow: 1 }}
          elevation={0}
        >
          <Toolbar>
            <TextField
              placeholder="Search cakes or locations..."
              size="small"
              sx={{
                flexGrow: 1,
                maxWidth: 600,
                bgcolor: "#f5f5f5",
                borderRadius: "25px",
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#757575" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={()=> router.push("/cart")}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon sx={{ color: "#ff3d6c" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={0} color="error">
                <FavoriteIcon sx={{ color: "#ff3d6c" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => router.push("/profile")}>
              <PersonIcon sx={{ color: "#ff3d6c" }} />
            </IconButton>

          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Hero Section with chocolate background */}
          <Box
            sx={{
              position: "relative",
              height: "800px",
              backgroundImage: `url(${images[currentImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              borderRadius: "16px",
              animation: "zoomInOut 3s ease-in-out infinite",
              "@keyframes zoomInOut": {
                "0%, 100%": {
                  transform: "scale(1)",
                },
                "50%": {
                  transform: "scale(1.05)",
                },
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "16px",
              },
            }}
          >
            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "32px", md: "48px" },
                    fontWeight: 700,
                    color: "white",
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  WELCOME TO
                  <br />
                  SWEETEST LIFE
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      borderRadius: "25px",
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    Click to Order
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => router.push("/categories")}
                    sx={{
                      borderColor: "white",
                      color: "white",
                      borderRadius: "25px",
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    VIEW MENU
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
