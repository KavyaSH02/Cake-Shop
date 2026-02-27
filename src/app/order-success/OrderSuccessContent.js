"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Card,
    Button,
    Divider,
    Chip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";


export default function OrderSuccessContent() {
    const [order, setOrder] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        if (orderId) {
            const orders = JSON.parse(localStorage.getItem("orders") || "[]");
            const foundOrder = orders.find(o => o.id.toString() === orderId);
            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                // Fallback order data if not found in localStorage
                setOrder({
                    id: orderId,
                    status: "confirmed",
                    orderDate: new Date().toISOString(),
                    customer: {
                        name: "Customer",
                        email: "customer@example.com",
                        phone: "1234567890"
                    },
                    delivery: {
                        address: "Sample Address",
                        city: "Sample City",
                        pincode: "123456",
                        deliveryTime: "standard"
                    },
                    items: [
                        {
                            id: "1",
                            name: "Chocolate Cake",
                            price: 299,
                            quantity: 1
                        }
                    ],
                    total: 299,
                    payment: "cod"
                });
            }
        }
    }, [orderId]);

    if (!order) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f8f8f8",
                    p: 3
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, color: "#666" }}>
                    Order not found
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push("/")}
                    sx={{ bgcolor: "#c62828", "&:hover": { bgcolor: "#a02020" } }}
                >
                    Go Home
                </Button>
            </Box>
        );
    }
    return (
        <Box sx={{ bgcolor: "#f8f8f8", minHeight: "100vh", py: 4 }}>
            <Box sx={{ maxWidth: 600, mx: "auto", px: 3 }}>

                {/* Success Header */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 4
                }}>
                    <CheckCircleIcon sx={{
                        fontSize: 80,
                        color: "#4caf50",
                        mb: 2
                    }} />
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: "#4caf50",
                        mb: 1,
                        textAlign: "center"
                    }}>
                        Order Placed Successfully!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
                        Thank you for your order. We'll start preparing your delicious cakes right away!
                    </Typography>
                </Box>

                {/* Order Details */}
                <Card sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Order Details
                        </Typography>
                        <Chip
                            label={order.status.toUpperCase()}
                            color="success"
                            size="small"
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Order ID: #{order.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Order Date: {new Date(order.orderDate).toLocaleDateString()}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Customer Info */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Customer Information
                        </Typography>
                        <Typography variant="body2">{order.customer.name}</Typography>
                        <Typography variant="body2">{order.customer.email}</Typography>
                        <Typography variant="body2">{order.customer.phone}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Delivery Info */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Delivery Address
                        </Typography>
                        <Typography variant="body2">{order.delivery.address}</Typography>
                        <Typography variant="body2">{order.delivery.city}, {order.delivery.pincode}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Delivery Type: {order.delivery.deliveryTime === "express" ? "Express (1 hour)" : "Standard (2-3 hours)"}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Order Items */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Order Items
                        </Typography>
                        {order.items.map((item) => (
                            <Box key={item.id} sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1
                            }}>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
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

                    <Divider sx={{ my: 2 }} />

                    {/* Payment Info */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            ₹{order.items.reduce((total, item) => total + (item.price * item.quantity), 0)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body1">Delivery:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "#4caf50" }}>
                            {order.delivery.deliveryTime === "express" ? "₹50" : "FREE"}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Total Paid:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#c62828" }}>
                            ₹{order.total + (order.delivery.deliveryTime === "express" ? 50 : 0)}
                        </Typography>
                    </Box>

                    <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                            Payment Method:
                        </Typography>

                        {/* COD */}
                        {order.payment === "cod" && (
                            <>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Cash on Delivery
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Please keep exact change ready for delivery
                                </Typography>
                            </>
                        )}

                        {/* ONLINE PAYMENT */}
                        {order.payment === "online" && (
                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<PhoneAndroidIcon />}
                                    sx={{ flex: 1 }}
                                    onClick={() => alert("Redirecting to PhonePe...")}
                                >
                                    PhonePe
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<AccountBalanceWalletIcon />}
                                    sx={{ flex: 1 }}
                                    onClick={() => alert("Redirecting to Google Pay...")}
                                >
                                    Google Pay
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<AccountBalanceWalletIcon />}
                                    sx={{ flex: 1 }}
                                    onClick={() => alert("Redirecting to Paytm...")}
                                >
                                    Paytm
                                </Button>
                            </Box>
                        )}
                    </Box>

                </Card>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <Button
                        variant="contained"
                        startIcon={<ShoppingBagIcon />}
                        onClick={() => router.push('/products?category=fruit-cakes')}
                        sx={{
                            bgcolor: "#c62828",
                            "&:hover": { bgcolor: "#a02020" },
                            flex: 1
                        }}
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<HomeIcon />}
                        onClick={() => router.push('/')}
                        sx={{
                            borderColor: "#c62828",
                            color: "#c62828",
                            "&:hover": { borderColor: "#a02020", bgcolor: "#fef5f5" },
                            flex: 1
                        }}
                    >
                        Go Home
                    </Button>
                </Box>

                {/* Delivery Info */}
                <Card sx={{ p: 3, mt: 3, bgcolor: "#e8f5e8" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#2e7d32" }}>
                        What's Next?
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        • We'll start preparing your order immediately
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        • You'll receive updates via SMS/Email
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        • Expected delivery: {order.delivery.deliveryTime === "express" ? "Within 1 hour" : "2-3 hours"}
                    </Typography>
                    <Typography variant="body2">
                        • Our delivery partner will contact you before arrival
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
}