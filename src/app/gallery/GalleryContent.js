"use client";
import Image from "next/image";
import { Box, Typography, Card, IconButton, Button, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GalleryContent() {
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const newWishlist = { ...prev };
      if (prev[product.id]) {
        delete newWishlist[product.id];
      } else {
        newWishlist[product.id] = product;
      }
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newCart = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const cakeProducts = [
    { id: 1, name: "Classic White Graduation Cake", price: 25.00, image: "/thar1.jpg" },
    { id: 2, name: "Monochrome Graduation Cake", price: 27.00, image: "/doreman.jpg" },
    { id: 3, name: "Sugar and Spice Twin Cake", price: 40.00, image: "/bullet.jpg" },
    { id: 4, name: "Artistic Multi-Tiered Cake", price: 45.00, image: "/ballon.jpg" },
    { id: 5, name: "Mickey Mouse Themed Cake", price: 36.99, image: "/girls.jpg" },
    { id: 6, name: "Hand-Painted Illustrations", price: 70.00, image: "/panda.jpg" },
    { id: 7, name: "Draped Floating Wedding Cake", price: 90.00, image: "/hand painted.jpg" },
    { id: 8, name: "Disney Princess Kids Cake", price: 46.49, image: "/princes.jpg" },
    { id: 9, name: "Disney Princess Kids Cake", price: 46.49, image: "/car.jpg" }

  ];

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f5f5f5",
      py: 4,
      px: { xs: 2, md: 4 }
    }}>
      <Box
        onClick={() => router.back()}
        sx={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "#ffb3ba",
          color: "#333",
          px: 1.5,
          py: 2.5,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          cursor: "pointer",
          fontWeight: 700,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          "&:hover": {
            bgcolor: "#ff9aa0",
          },
        }}
      >
        BACK
      </Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 700,
          color: "#333"
        }}
      >
        Cake Gallery
      </Typography>

      <Grid container spacing={10} sx={{ maxWidth: 1400, mx: "auto", justifyContent: "center" }}>
        {cakeProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
            <Card sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#fff",
              width: 350,
              mx: "auto",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",

              }
            }}>
              {/* Heart Icon */}
              <IconButton
                onClick={() => toggleWishlist(product)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                {wishlist[product.id] ? (
                  <FavoriteIcon sx={{ color: "#e53935" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#e53935" }} />
                )}
              </IconButton>

              {/* Product Image */}
              <Box sx={{
                position: "relative",
                width: "100%",
                height: 200,
                overflow: "hidden"
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    console.log('Gallery image failed to load:', product.image);
                    e.target.src = 'https://via.placeholder.com/350x200/ffb3ba/333?text=Cake';
                  }}
                />
              </Box>

              {/* Product Details */}
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    mb: 1,
                    color: "#333",
                    lineHeight: 1.3
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#ff6b6b",
                    fontWeight: 700,
                    mb: 2
                  }}
                >
                  ${product.price.toFixed(2)}
                </Typography>

                <Button
                  onClick={() => addToCart(product)}
                  fullWidth
                  sx={{
                    bgcolor: "#ffb3ba",
                    color: "#333",
                    fontWeight: 600,
                    py: 1,
                    borderRadius: 1,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#ff9aa0"
                    }
                  }}
                >
                  Add To Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}