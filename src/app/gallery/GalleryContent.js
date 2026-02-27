"use client";
import Image from "next/image";
import { Box, Typography, Card, IconButton, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GalleryContent() {
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const savedQuantities = {};
      parsedCart.forEach(item => {
        savedQuantities[item.id] = item.quantity;
      });
      setQuantities(savedQuantities);
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
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newCart = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
        return newCart;
      }
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
      return newCart;
    });
    setAddedItem(product);
    setShowPopup(true);
  };

  const handleIncrement = (id) => {
    const newQty = (quantities[id] || 0) + 1;
    setQuantities(prev => ({ ...prev, [id]: newQty }));
    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
      return newCart;
    });
  };

  const handleDecrement = (id) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        setCart(prev => {
          const newCart = prev.filter(item => item.id !== id);
          localStorage.setItem('cart', JSON.stringify(newCart));
          window.dispatchEvent(new Event("cartUpdated"));
          return newCart;
        });
        return rest;
      }
      setCart(prev => {
        const newCart = prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
        return newCart;
      });
      return { ...prev, [id]: newQty };
    });
  };

  const handleViewCart = () => {
    router.push('/cart');
  };

  const cakeProducts = [
    { id: 1, name: "Classic White Graduation Cake", price: 900, image: "/thar1.jpg" },
    { id: 2, name: "Monochrome Graduation Cake", price: 2000, image: "/doreman.jpg" },
    { id: 3, name: "Sugar and Spice Twin Cake", price: 3000, image: "/bullet.jpg" },
    { id: 4, name: "Artistic Multi-Tiered Cake", price: 1500, image: "/ballon.jpg" },
    { id: 5, name: "Mickey Mouse Themed Cake", price: 1200, image: "/girls.jpg" },
    { id: 6, name: "Hand-Painted Illustrations", price: 1000, image: "/panda.jpg" },
    { id: 7, name: "Draped Floating Wedding Cake", price: 1250, image: "/hand painted.jpg" },
    { id: 8, name: "Disney Princess Kids Cake", price: 1400, image: "/princes.jpg" },
    { id: 9, name: "Disney Princess Kids Cake", price: 2300, image: "/car.jpg" }

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
                  ₹{product.price}
                </Typography>

                {!quantities[product.id] ? (
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
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, bgcolor: "#ffb3ba", borderRadius: 1, py: 0.5 }}>
                    <IconButton size="small" onClick={() => handleDecrement(product.id)} sx={{ color: "#333" }}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ color: "#333", fontWeight: 700, minWidth: 24, textAlign: "center" }}>
                      {quantities[product.id]}
                    </Typography>
                    <IconButton size="small" onClick={() => handleIncrement(product.id)} sx={{ color: "#333" }}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>Added to Cart</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          {addedItem && (
            <>
              <Avatar src={addedItem.image} alt={addedItem.name} variant="rounded" sx={{ width: 80, height: 80 }} />
              <Typography sx={{ fontWeight: 700 }}>{addedItem.name}</Typography>
              <Typography color="text.secondary">${addedItem.price.toFixed(2)}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
          <Button onClick={() => setShowPopup(false)} sx={{ textTransform: "none" }}>Continue</Button>
          <Button onClick={handleViewCart} startIcon={<ShoppingCartIcon />} sx={{ bgcolor: "#ffb3ba", color: "#333", textTransform: "none", '&:hover': { bgcolor: '#ff9aa0' } }}>View Cart</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}