"use client";
import Image from "next/image";
import { Box, Typography, Card, IconButton, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleIncrement = (id) => {
    const newCart = cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const handleDecrement = (id) => {
    const newCart = cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    updateCart(newCart);
  };

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        bgcolor: "#f8f8f8",
        p: 3
      }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
          Your cart is empty
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => router.push('/products')}
          sx={{ 
            bgcolor: "#c62828", 
            "&:hover": { bgcolor: "#a02020" },
            px: 4,
            py: 1
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8f8f8", minHeight: "100vh", py: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2, 
        px: 3, 
        mb: 3,
        maxWidth: 1200,
        mx: "auto"
      }}>
        <IconButton 
          onClick={() => router.back()}
          sx={{ 
            bgcolor: "white", 
            "&:hover": { bgcolor: "#f5f5f5" } 
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Cart ({getTotalItems()} items)
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          
          {/* Cart Items */}
          <Box sx={{ flex: 1 }}>
            {cart.map((item) => (
              <Card key={item.id} sx={{ 
                mb: 2, 
                p: 2, 
                display: "flex", 
                alignItems: "center",
                gap: 2
              }}>
                <Box sx={{ 
                  width: 100, 
                  height: 100, 
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  flexShrink: 0
                }}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    style={{ objectFit: "cover" }} 
                  />
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#c62828" }}>
                      ₹{item.price}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      textDecoration: "line-through", 
                      color: "text.secondary" 
                    }}>
                      ₹{item.originalPrice}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  gap: 2 
                }}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1, 
                    bgcolor: "#c62828", 
                    borderRadius: 1, 
                    px: 1 
                  }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDecrement(item.id)} 
                      sx={{ color: "#fff" }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ 
                      color: "#fff", 
                      fontWeight: 700, 
                      minWidth: 24, 
                      textAlign: "center" 
                    }}>
                      {item.quantity}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleIncrement(item.id)} 
                      sx={{ color: "#fff" }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <IconButton 
                    onClick={() => handleRemove(item.id)}
                    sx={{ color: "#f44336" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Order Summary */}
          <Box sx={{ width: { xs: "100%", md: 350 } }}>
            <Card sx={{ p: 3, position: "sticky", top: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                {cart.map((item) => (
                  <Box key={item.id} sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    mb: 1 
                  }}>
                    <Typography variant="body2">
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ₹{getTotalPrice()}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Delivery:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "#4caf50" }}>
                  FREE
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#c62828" }}>
                  ₹{getTotalPrice()}
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  bgcolor: "#c62828", 
                  "&:hover": { bgcolor: "#a02020" },
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "16px"
                }}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}