"use client";
import { Box, Typography, Card, IconButton, Button, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DollGalleryContent() {
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
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

  const handleAdd = async (product) => {
    const email = localStorage.getItem('email');
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    try {
      await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })
      });
    } catch (error) {
      console.error('Cart add error:', error);
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
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
      console.error('Cart update error:', error);
    }
    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
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
        console.error('Cart remove error:', error);
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
        console.error('Cart update error:', error);
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

                {!quantities[product.id] ? (
                  <Button
                    onClick={() => handleAdd(product)}
                    fullWidth
                    sx={{
                      bgcolor: "#c4dbf5",
                      color: "black",
                      fontWeight: 550,
                      py: -2,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#8ab7eb" }
                    }}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, bgcolor: "#c4dbf5", borderRadius: 1, py: 0.5 }}>
                    <IconButton size="small" onClick={() => handleDecrement(product.id)} sx={{ color: "#333" }}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ fontWeight: 700, minWidth: 24, textAlign: "center" }}>
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
    </Box>
  );
}
