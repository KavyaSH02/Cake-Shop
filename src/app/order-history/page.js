"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  Chip,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const router = useRouter();

 const handleReorder = async (orderId) => {
  const response = await fetch(`http://127.0.0.1:8000/orders/${orderId}/reorder`, {
    method: "POST",
  });
  
  const data = await response.json();
  setSnackbar({ open: true, message: data.message });
  setTimeout(() => router.push("/cart"), 1500);
};


 useEffect(() => {
  fetch("http://127.0.0.1:8000/orders")
    .then(res => res.json())
    .then(data => setOrders(data))
    .catch(err => console.error("Failed to fetch orders", err));
}, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'preparing': return 'warning';
      case 'delivered': return 'primary';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (orders.length === 0) {
    return (
      <Box sx={{ bgcolor: "#f8f8f8", minHeight: "100vh", py: 3 }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          mb: 3,
          maxWidth: 800,
          mx: "auto"
        }}>
          <IconButton
            onClick={() => router.back()}
            sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Order History
          </Typography>
        </Box>

        <Box sx={{
          maxWidth: 800,
          mx: "auto",
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh"
        }}>
          <ShoppingBagIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1, color: "#666" }}>
            No Orders Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
            You haven't placed any orders yet. Start shopping to see your order history here.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/products')}
            sx={{
              bgcolor: "#c62828",
              "&:hover": { bgcolor: "#a02020" }
            }}
          >
            Start Shopping
          </Button>
        </Box>
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
        maxWidth: 800,
        mx: "auto"
      }}>
        <IconButton
          onClick={() => router.back()}
          sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Order History
        </Typography>
        
      </Box>

      {/* Orders List */}
      <Box sx={{ maxWidth: 800, mx: "auto", px: 3 }}>
        {orders.map((order) => (
          <Card key={order.id} sx={{ mb: 1.5, p: 1.5, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            {/* Order Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Order #{order.id}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: 14, color: "#666" }} />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(order.orderDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Box>
              </Box>
              <Chip
  label="Delivered"
  size="small"
  sx={{
    borderRadius: "6px",           // pill shape
    bgcolor: "#E8F5E9",             // light green background
    color: "#2E7D32",               // dark green text
    border: "1px solid #A5D6A7",    // green border
    fontWeight: 750,
    fontSize: "14px",
    px: 1,
    py:2// horizontal padding
  }}
/>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Order Items */}
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Items ({order.items.length})
              </Typography>
              {order.items.map((item, index) => (
                <Box key={index} sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  py: 0.5,
                  borderBottom: index < order.items.length - 1 ? "1px solid #f0f0f0" : "none"
                }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity} × ₹{item.price}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Delivery Info */}
            {/* <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1.5 }}>
              <LocationOnIcon sx={{ fontSize: 14, color: "#666", mt: 0.5 }} /> */}
              {/* <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Delivery Address
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {order.delivery.address}, {order.delivery.city} - {order.delivery.pincode}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {order.delivery.deliveryTime === "express" ? "Express Delivery (1 hour)" : "Standard Delivery (2-3 hours)"}
                </Typography>
              </Box> */}
            {/* </Box> */}

            {/* <Divider sx={{ my: 1 }} /> */}

            {/* Order Total */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Payment: {order.payment === "cod" ? "Cash on Delivery" : "Online Payment"}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="caption" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#c62828" }}>
                  ₹{order.total + (order.delivery.deliveryTime === "express" ? 50 : 0)}
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => router.push(`/order-success?orderId=${order.id}`)}
                sx={{ 
                  borderColor: "#c62828", 
                  color: "#c62828",
                  textTransform: "none",
                  "&:hover": { borderColor: "#a02020", bgcolor: "#fef5f5" }
                }}
              >
                View Details
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleReorder(order.id)}
                sx={{ 
                  bgcolor: "#c62828", 
                   textTransform: "none",
                  "&:hover": { bgcolor: "#a02020" }
                }}
              >
                ReOrder
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={9000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ bgcolor: "#dba3e3", color: "#060606" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}