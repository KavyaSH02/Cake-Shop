"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: ""
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    pincode: "",
    deliveryTime: "standard"
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCartFromBackend();
    loadSavedAddress();
  }, [router]);

  const fetchCartFromBackend = async () => {
    try {
      setLoading(true);
      const userEmail = localStorage.getItem('email');
      if (!userEmail) {
        router.push('/cart');
        return;
      }
      const res = await fetch(`http://127.0.0.1:8000/cart?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();

      const normalizedCart = (data.items || []).map(ci => ({
        id: ci.id,
        product_id: ci.id,
        name: ci.name,
        price: ci.price,
        originalPrice: ci.originalPrice,
        image: ci.image,
        description: ci.description,
        quantity: ci.quantity
      }));

      setCart(normalizedCart);
      if (normalizedCart.length === 0) {
        router.push('/cart');
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedAddress = () => {
    const email = localStorage.getItem('email');
    if (email) {
      const savedAddress = localStorage.getItem(`address_${email}`);
      if (savedAddress) {
        const addressData = JSON.parse(savedAddress);
        setCustomerInfo({
          name: addressData.name || '',
          phone: addressData.phone || ''
        });
        setDeliveryInfo({
          address: addressData.address || '',
          city: addressData.city || '',
          pincode: addressData.pincode || '',
          deliveryTime: 'standard'
        });
      }
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.name.trim()) newErrors.name = "Name is required";
    if (!customerInfo.phone.trim()) newErrors.phone = "Phone is required";
    if (!deliveryInfo.address.trim()) newErrors.address = "Address is required";
    if (!deliveryInfo.city.trim()) newErrors.city = "City is required";
    if (!deliveryInfo.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) {
        alert("Please login first");
        return;
      }
      const res = await fetch(`http://127.0.0.1:8000/orders?email=${encodeURIComponent(userEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer: customerInfo,
          delivery: deliveryInfo,
          payment_method: paymentMethod,
          items: cart,
          total: getTotalPrice() + (deliveryInfo.deliveryTime === "express" ? 50 : 0)
        })
      });

      const data = await res.json();
      console.log("Order response:", data);

      if (!res.ok) throw new Error(data.detail || "Order failed");

      // ✅ Redirect after backend success
      const orderId = data.data?.order_id || data.order_id || data.id;
      console.log("Redirecting with order ID:", orderId);
      router.push(`/order-success?orderId=${orderId}`);

    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f8f8"
      }}>
        <Typography variant="h6">Loading checkout...</Typography>
      </Box>
    );
  }

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
          No items to checkout
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/products')}
          sx={{
            bgcolor: "#c62828",
            "&:hover": { bgcolor: "#a02020" }
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
          sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Checkout
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>

          {/* Checkout Form */}
          <Box sx={{ flex: 1 }}>

            {/* Delivery Information */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <LocationOnIcon sx={{ color: "#c62828" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Delivery Information
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth
                />
                <TextField
                  label="Address"
                  multiline
                  rows={2}
                  value={deliveryInfo.address}
                  onChange={(e) => {
                    setDeliveryInfo({ ...deliveryInfo, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: "" });
                  }}
                  error={!!errors.address}
                  helperText={errors.address}
                  fullWidth
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="City"
                    value={deliveryInfo.city}
                    onChange={(e) => {
                      setDeliveryInfo({ ...deliveryInfo, city: e.target.value });
                      if (errors.city) setErrors({ ...errors, city: "" });
                    }}
                    error={!!errors.city}
                    helperText={errors.city}
                    fullWidth
                  />
                  <TextField
                    label="Pincode"
                    value={deliveryInfo.pincode}
                    onChange={(e) => {
                      setDeliveryInfo({ ...deliveryInfo, pincode: e.target.value });
                      if (errors.pincode) setErrors({ ...errors, pincode: "" });
                    }}
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    fullWidth
                  />
                </Box>

                <FormControl>
                  <FormLabel sx={{ color: "#c62828", fontWeight: 600 }}>
                    Delivery Time
                  </FormLabel>
                  <RadioGroup
                    value={deliveryInfo.deliveryTime}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, deliveryTime: e.target.value })}
                  >
                    <FormControlLabel
                      value="standard"
                      control={<Radio sx={{ color: "#c62828" }} />}
                      label="Standard Delivery (2-3 hours) - FREE"
                    />
                    <FormControlLabel
                      value="express"
                      control={<Radio sx={{ color: "#c62828" }} />}
                      label="Express Delivery (1 hour) - ₹50"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Card>

            {/* Payment Method */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <PaymentIcon sx={{ color: "#c62828" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Payment Method
                </Typography>
              </Box>

              <FormControl>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio sx={{ color: "#c62828" }} />}
                    label="Cash on Delivery"
                  />
                  <FormControlLabel
                    value="online"
                    control={<Radio sx={{ color: "#c62828" }} />}
                    label="Online Payment (UPI/Card)"
                  />
                </RadioGroup>
              </FormControl>
            </Card>
          </Box>

          {/* Order Summary Sidebar */}
          <Box sx={{ width: { xs: "100%", md: 400 } }}>
            <Card sx={{ p: 2, position: "sticky", top: 20, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                Bill Details
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Item Total</Typography>
                <Typography variant="body2">₹{getTotalPrice()}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Delivery Fee</Typography>
                <Typography variant="body2" sx={{ color: "#4caf50" }}>{deliveryInfo.deliveryTime === "express" ? "₹50" : "FREE"}</Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>To Pay</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#c62828" }}>₹{getTotalPrice() + (deliveryInfo.deliveryTime === "express" ? 50 : 0)}</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                sx={{
                  bgcolor: "#c62828",
                  "&:hover": { bgcolor: "#a02020" },
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: "none"
                }}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>

              {paymentMethod === "online" && (
                <Alert severity="info" sx={{ mt: 2, fontSize: "0.875rem" }}>
                  You will be redirected to payment gateway after placing order
                </Alert>
              )}
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}