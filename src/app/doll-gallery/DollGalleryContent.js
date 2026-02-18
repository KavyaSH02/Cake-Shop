"use client";
import { Box, Typography, Card, IconButton, Button, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DollGalleryContent() {
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

  const toggleWishlist = async (product) => {
    const isInWishlist = wishlist[product.id];

    try {
      if (isInWishlist) {
        await fetch(`http://127.0.0.1:8000/wishlist/remove/${product.id}`, { method: "DELETE" });
        setWishlist(prev => {
          const newWishlist = { ...prev };
          delete newWishlist[product.id];
          localStorage.setItem('wishlist', JSON.stringify(newWishlist));
          return newWishlist;
        });
      } else {
        await fetch("http://127.0.0.1:8000/wishlist/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          })
        });
        setWishlist(prev => {
          const newWishlist = { ...prev, [product.id]: product };
          localStorage.setItem('wishlist', JSON.stringify(newWishlist));
          return newWishlist;
        });
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      await fetch("http://127.0.0.1:8000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        })
      });

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
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const dollCakes = [
    { id: 1001, name: "Princess Doll Cake", price: 35.00, image: "/princesdoll.jpg" },
    { id: 1002, name: "Barbie Dream Cake", price: 38.00, image: "/bar.jpg" },
    { id: 1003, name: "Fairy Tale Doll Cake", price: 42.00, image: "/fairy.jpg" },
    { id: 1004, name: "Elegant Doll Cake", price: 40.00, image: "/ele.jpg" },
    { id: 1005, name: "Rainbow Doll Cake", price: 45.00, image: "/raa.png" },
    { id: 1006, name: "Frozen Princess Cake", price: 48.00, image: "/fro.jpg" },
    { id: 1007, name: "Butterfly Doll Cake", price: 43.00, image: "/bu.jpg" },
    { id: 1008, name: "Unicorn Doll Cake", price: 50.00, image: "/uni.jpg" },
    { id: 1009, name: "Mermaid Doll Cake", price: 47.00, image: "/fish.jpg" }
  ];

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#fbfbfb",
      py: 5,
      px: { xs: 2, md: 4 }
    }}>
      <Button
        onClick={() => router.back()}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          color: "#1573e0",
          px: -1,
          py: -1,
          fontWeight: 500,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
         Back
      </Button>
      
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 5,
          fontWeight: 700,
          fontStyle: "italic",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          letterSpacing: 2,
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          background: "linear-gradient(90deg, #1e90ff 0%, #87ceeb 50%, #00bfff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
         Doll Cake Gallery 
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: "auto" , gap:12}}>
        {dollCakes.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "white",
              width: 320,
              mx: "auto",
              boxShadow: "0 2px 8px rgba(25,118,210,0.15)",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
              }
            }}>
              <IconButton
                onClick={() => toggleWishlist(product)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 2,
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                {wishlist[product.id] ? (
                  <FavoriteIcon sx={{ color: "#e53935" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#e53935" }} />
                )}
              </IconButton>

              <Box sx={{
                width: "100%",
                height: 280,
                overflow: "hidden"
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x220/f5f5f5/333?text=Doll+Cake';
                  }}
                />
              </Box>

              <Box sx={{ p: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    mb: 1,
                    color: "#2a2f33"
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#25272a",
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  ${product.price.toFixed(2)}
                </Typography>

                <Button
                  onClick={() => addToCart(product)}
                  fullWidth
                  sx={{
                    bgcolor: "#c4dbf5",
                    color: "black",
                    fontWeight: 550,
                    py: -2,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#8ab7eb"
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
