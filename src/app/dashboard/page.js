"use client";
import { useState } from "react";
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
  const router = useRouter();
  


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
            <ListItemButton sx={{ borderRadius: 2 }}>
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
            <IconButton>
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon sx={{ color: "#ff3d6c" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={5} color="error">
                <FavoriteIcon sx={{ color: "#ff3d6c" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => router.push("/profile")}>
              <PersonIcon sx={{ color: "#ff3d6c" }} />
           </IconButton>

          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>

          {/* Categories Section */}
          <Box sx={{ mb: 5 }}>
            <Typography fontWeight={700} fontSize="28px" sx={{ mb: 3 }}>
              Categories
            </Typography>

            <Grid container spacing={3}>
              {[
                {
                  img: "/fruit.png",
                  label: "Fruit cakes",
                },
                {
                  img: "/biscuit.jpg",
                  label: "Biscuits",
                },
                {
                  img: "/choc.jpg",
                  label: "Chocolate cakes",
                },
                {
                  img: "/cupcake.jpg",
                  label: "cup cakes",
                },
                 {
                  img: "/donuts.jpeg",
                  label: "donuts",
                },
                 
              ].map((c, i) => (
                <Grid key={i} item xs={12} sm={6} md={2.4} lg={2.4}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.18s",
                      "&:hover": { transform: "scale(1.04)" },
                      boxShadow: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={c.img}
                      sx={{ 
                        objectFit: "cover",
                        width: "100%",
                        height: 140,
                        flexShrink: 0,
                      }}
                    />
                    <CardContent sx={{ textAlign: "center", py: 1.5, minHeight: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#ff3d6c",
                        }}
                      >
                        {c.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Featured Products Section */}
          <Box>
            <Typography fontWeight={700} fontSize="28px" sx={{ mb: 3 }}>
              Featured Products
            </Typography>

            <Grid container spacing={3}>
              {/* Product 1 */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ borderRadius: "18px", p: 1 }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image="https://images.unsplash.com/photo-1542838686-6e90f1b4f1c9"
                    sx={{ borderRadius: "16px" }}
                  />
                  <CardContent>
                    <Typography fontWeight={700} fontSize="18px">
                      Delicio Cake
                    </Typography>
                    <Typography fontSize="14px" color="gray">
                      $15.00/kg
                    </Typography>
                    <Typography sx={{ color: "#FFD700", mt: 1 }}>
                      ★★★★★
                    </Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "20px",
                          bgcolor: "#ff3d6c",
                          "&:hover": { bgcolor: "#e6356a" },
                          textTransform: "none",
                          px: 3,
                        }}
                      >
                        Add to Cart
                      </Button>
                      <IconButton onClick={() => toggleWishlist(0)}>
                        {wishlist[0] ? (
                          <FavoriteIcon sx={{ color: "#ff3d6c" }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: "#ff3d6c" }} />
                        )}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>


            </Grid>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
