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
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const savedQuantities = {};
      parsedCart.forEach(item => { savedQuantities[item.id] = item.quantity; });
      setQuantities(savedQuantities);
    }

    const fetchWishlist = async () => {
      const email = localStorage.getItem('email');
      if (!email) return;
      try {
        const res = await fetch(`http://127.0.0.1:8000/wishlist?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        const formatted = {};
        data.forEach(item => { formatted[item.product_id] = item; });
        setWishlist(formatted);
        localStorage.setItem('wishlist', JSON.stringify(formatted));
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (error) {
        console.error('Wishlist fetch error:', error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const email = localStorage.getItem('email');
    if (!email) return;
    const isWishlisted = !!wishlist[product.id];

    try {
      if (isWishlisted) {
        await fetch(`http://127.0.0.1:8000/wishlist/remove/${product.id}?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
        setWishlist(prev => {
          const updated = { ...prev };
          delete updated[product.id];
          localStorage.setItem('wishlist', JSON.stringify(updated));
          window.dispatchEvent(new Event("wishlistUpdated"));
          return updated;
        });
      } else {
        await fetch(`http://127.0.0.1:8000/wishlist/add?email=${encodeURIComponent(email)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: product.id, name: product.name, price: product.price, image: product.image, description: '' })
        });
        setWishlist(prev => {
          const updated = { ...prev, [product.id]: product };
          localStorage.setItem('wishlist', JSON.stringify(updated));
          window.dispatchEvent(new Event("wishlistUpdated"));
          return updated;
        });
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

 const handleAdd = async (id) => {
    const product = cakeProducts.find(p => p.id === id);
    const email = localStorage.getItem('email');
    setQuantities(prev => ({ ...prev, [id]: 1 }));

    try {
      await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: id, name: product.name, price: product.price, image: product.image, quantity: 1 })
      });
    } catch (error) {
      console.error('API Error:', error);
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    setAddedItem(product);
    setShowPopup(true);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrement = async (id) => {
    const newQty = (quantities[id] || 0) + 1;
    const email = localStorage.getItem('email');
    setQuantities(prev => ({ ...prev, [id]: newQty }));

    try {
      await fetch(`http://127.0.0.1:8000/cart/update?email=${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: id, quantity: newQty })
      });
    } catch (error) {
      console.error('API Error:', error);
    }

    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrement = async (id) => {
    const newQty = (quantities[id] || 0) - 1;
    const email = localStorage.getItem('email');

    if (newQty <= 0) {
      try {
        await fetch(`http://127.0.0.1:8000/cart/remove/${id}?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
      } catch (error) {
        console.error('API Error:', error);
      }
      setQuantities(prev => { const { [id]: _, ...rest } = prev; return rest; });
      setCart(prev => {
        const newCart = prev.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
    } else {
      try {
        await fetch(`http://127.0.0.1:8000/cart/update?email=${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: id, quantity: newQty })
        });
      } catch (error) {
        console.error('API Error:', error);
      }
      setQuantities(prev => ({ ...prev, [id]: newQty }));
      setCart(prev => {
        const newCart = prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleViewCart = () => {
    setShowPopup(false);
    router.push('/cart');
  };

  const cakeProducts = [
    { id: 11, name: "Classic White Graduation Cake", price: 900, image: "/thar1.jpg" },
    { id: 22, name: "Monochrome Graduation Cake", price: 2000, image: "/doreman.jpg" },
    { id: 33, name: "Sugar and Spice Twin Cake", price: 3000, image: "/bullet.jpg" },
    { id: 44, name: "Artistic Multi-Tiered Cake", price: 1500, image: "/ballon.jpg" },
    { id: 55, name: "Mickey Mouse Themed Cake", price: 1200, image: "/girls.jpg" },
    { id: 66, name: "Hand-Painted Illustrations", price: 1000, image: "/panda.jpg" },
    { id: 77, name: "Draped Floating Wedding Cake", price: 1250, image: "/hand painted.jpg" },
    { id: 88, name: "Disney Princess Kids Cake", price: 1400, image: "/princes.jpg" },
    { id: 99, name: "Disney Princess Kids Cake", price: 2300, image: "/car.jpg" }

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
                    onClick={() => handleAdd(product.id)}
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
              <Typography color="text.secondary">₹{addedItem.price}</Typography>
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