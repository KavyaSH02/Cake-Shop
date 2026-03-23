"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Chip,
  Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CakesPage() {
  const [open, setOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [weight, setWeight] = useState("0.5");
  const [flavor, setFlavor] = useState("Dutch Chocolate");
  const [shape, setShape] = useState("Round");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState(0);

  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const savedQuantities = {};
      parsedCart.forEach((item) => { savedQuantities[item.id] = item.quantity; });
      setQuantities(savedQuantities);
    }

    const fetchWishlist = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;
      try {
        const res = await fetch(`http://127.0.0.1:8000/wishlist?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        const formatted = {};
        data.forEach((item) => { formatted[item.product_id] = item; });
        setWishlist(formatted);
        localStorage.setItem("wishlist", JSON.stringify(formatted));
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (error) {
        console.error("Wishlist fetch error:", error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const email = localStorage.getItem("email");
    if (!email) return;
    const isWishlisted = !!wishlist[product.id];
    try {
      if (isWishlisted) {
        await fetch(`http://127.0.0.1:8000/wishlist/remove/${product.id}?email=${encodeURIComponent(email)}`, { method: "DELETE" });
        setWishlist((prev) => {
          const updated = { ...prev };
          delete updated[product.id];
          localStorage.setItem("wishlist", JSON.stringify(updated));
          window.dispatchEvent(new Event("wishlistUpdated"));
          return updated;
        });
      } else {
        await fetch(`http://127.0.0.1:8000/wishlist/add?email=${encodeURIComponent(email)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: product.id, name: product.name, price: product.price, image: product.image, description: product.desc || "" }),
        });
        setWishlist((prev) => {
          const updated = { ...prev, [product.id]: product };
          localStorage.setItem("wishlist", JSON.stringify(updated));
          window.dispatchEvent(new Event("wishlistUpdated"));
          return updated;
        });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  const handleAdd = async (id) => {
    const product = cakes.find((p) => p.id === id);
    const email = localStorage.getItem("email");
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
    try {
      await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: id, name: product.name, price: product.price, image: product.image, quantity: 1 }),
      });
    } catch (error) {
      console.error("API Error:", error);
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) return prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    setAddedItem(product);
    setShowPopup(true);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrement = async (id) => {
    const newQty = (quantities[id] || 0) + 1;
    const email = localStorage.getItem("email");
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    try {
      await fetch(`http://127.0.0.1:8000/cart/update?email=${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: id, quantity: newQty }),
      });
    } catch (error) {
      console.error("API Error:", error);
    }
    setCart((prev) => {
      const newCart = prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrement = async (id) => {
    const newQty = (quantities[id] || 0) - 1;
    const email = localStorage.getItem("email");
    if (newQty <= 0) {
      try {
        await fetch(`http://127.0.0.1:8000/cart/remove/${id}?email=${encodeURIComponent(email)}`, { method: "DELETE" });
      } catch (error) {
        console.error("API Error:", error);
      }
      setQuantities((prev) => { const { [id]: _, ...rest } = prev; return rest; });
      setCart((prev) => {
        const newCart = prev.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    } else {
      try {
        await fetch(`http://127.0.0.1:8000/cart/update?email=${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: id, quantity: newQty }),
        });
      } catch (error) {
        console.error("API Error:", error);
      }
      setQuantities((prev) => ({ ...prev, [id]: newQty }));
      setCart((prev) => {
        const newCart = prev.map((item) => item.id === id ? { ...item, quantity: newQty } : item);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: selectedCake.id, name: selectedCake.name, price: selectedCake.price, image: selectedCake.image, quantity: 1 }),
      });
      if (res.ok) {
        setOpen(false);
        setAddedItem(selectedCake);
        setShowPopup(true);
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleCheckout = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: selectedCake.id, name: selectedCake.name, price: selectedCake.price, image: selectedCake.image, quantity: 1 }),
      });
      if (res.ok) {
        setOpen(false);
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  const cakes = [
    { id: 801, name: "Special Designer Mini Choco Ball Round", desc: "Special Designer Mini Choco Ball Round Cake", price: 775, image: "/choo.jpg" },
    { id: 802, name: "Special Designer Choco Vanilla Chips", desc: "Exotic Butterscotch Caramello Cake", price: 775, image: "/weee.jpg" },
    { id: 803, name: "Special Designer Choco Stick Round", desc: "Exotic Devils Delight Cake", price: 775, image: "/he.jpg" },
    { id: 804, name: "Special Designer Dual Layer Heart", desc: "Fig & Honey Round Cake", price: 775, image: "/choco.jpg" },
    { id: 805, name: "Special Designer Dual Layer Heart", desc: "Fig & Honey Round Cake", price: 775, image: "/heee.jpg" },
    { id: 806, name: "Special Designer Dual Layer Heart", desc: "Fig & Honey Round Cake", price: 775, image: "/ani.jpg" },
  ];

  return (
    <Box>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* BACK BUTTON */}
      <Box
        onClick={() => router.back()}
        sx={{
          position: "fixed", top: 14, left: 10, zIndex: 1000,
          display: "flex", alignItems: "center", gap: "2px",
          px: "4px", py: "4px", bgcolor: "#ffe4e9", borderRadius: "12px",
          cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transition: "all 0.2s ease", "&:hover": { bgcolor: "#ffc0cb" },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "14px", color: "#7b2cbf" }} />
        <Typography sx={{ fontSize: "13px", fontWeight: 300, color: "#7b2cbf", lineHeight: "1" }} />
      </Box>

      {/* HERO BANNER */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #ffc0cb 0%, #ffe4e9 100%)",
          minHeight: "auto", py: -3, display: "flex", alignItems: "center",
          px: { xs: 2, md: 2 }, position: "relative", overflow: "hidden",
        }}
      >
        <Box sx={{ position: "absolute", top: 15, left: 40, fontSize: 35, animation: "float 3s ease-in-out infinite, fadeInOut 2s ease-in-out infinite" }}>❤️</Box>
        <Box sx={{ position: "absolute", top: 70, left: 150, fontSize: 25, animation: "float 3.5s ease-in-out infinite 0.5s, fadeInOut 2.5s ease-in-out infinite" }}>💕</Box>
        <Box sx={{ position: "absolute", top: 120, left: 90, fontSize: 30, animation: "float 4s ease-in-out infinite 1s, fadeInOut 3s ease-in-out infinite" }}>💖</Box>
        <Box sx={{ position: "absolute", top: 25, right: 80, fontSize: 40, animation: "float 3s ease-in-out infinite 1.5s, fadeInOut 2s ease-in-out infinite" }}>💗</Box>
        <Box sx={{ position: "absolute", top: 90, right: 180, fontSize: 28, animation: "float 3.5s ease-in-out infinite 2s, fadeInOut 2.5s ease-in-out infinite" }}>❤️</Box>
        <Box sx={{ position: "absolute", bottom: 50, left: 220, fontSize: 32, animation: "float 4s ease-in-out infinite 0.8s, fadeInOut 3s ease-in-out infinite" }}>💕</Box>
        <Box sx={{ position: "absolute", bottom: 90, right: 100, fontSize: 38, animation: "float 3s ease-in-out infinite 1.2s, fadeInOut 2s ease-in-out infinite" }}>💖</Box>
        <Box sx={{ position: "absolute", bottom: 35, right: 250, fontSize: 30, animation: "float 3.5s ease-in-out infinite 1.8s, fadeInOut 2.5s ease-in-out infinite" }}>💗</Box>
        <Box sx={{ position: "absolute", top: 50, left: "50%", fontSize: 26, animation: "float 4s ease-in-out infinite 0.3s, fadeInOut 3s ease-in-out infinite" }}>❤️</Box>
        <Box sx={{ position: "absolute", top: 20, right: 550, fontSize: 30, animation: "float 3s ease-in-out infinite 2.5s, fadeInOut 2s ease-in-out infinite" }}>💗</Box>
        <Box sx={{ position: "absolute", bottom: 60, right: 350, fontSize: 32, animation: "float 3.5s ease-in-out infinite 1.3s, fadeInOut 2.5s ease-in-out infinite" }}>💕</Box>
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "flex-end", mr: 25 }} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" }, fontWeight: 200, fontStyle: "italic",
                color: "#7b2cbf", lineHeight: 1.3, fontFamily: "'Brush Script MT', cursive", mb: 2,
              }}
            >
              Make Your Big Day
              <br />
              Sweeter with Monginis Wedding Cakes !
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* CAKE CARDS */}
      <Box px={{ xs: 2, md: 6 }} py={5} sx={{ bgcolor: "#fff" }}>
        <Typography variant="h5" fontWeight={700} mb={3}>✨ Cakes</Typography>
        <Grid container spacing={3}>
          {cakes.map((cake) => (
            <Grid item xs={12} sm={6} md={3} key={cake.id}>
              <Card
                sx={{
                  cursor: "pointer", borderRadius: 3, position: "relative",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                {/* Wishlist Heart */}
                <IconButton
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(cake); }}
                  sx={{
                    position: "absolute", top: 8, right: 8, zIndex: 2,
                    bgcolor: "rgba(255,255,255,0.9)", "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  {wishlist[cake.id] ? (
                    <FavoriteIcon sx={{ color: "#e53935" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "#e53935" }} />
                  )}
                </IconButton>

                <CardMedia
                  component="img"
                  image={cake.image}
                  alt={cake.name}
                  onClick={() => { setSelectedCake(cake); setWeight("0.5 Kg"); setOpen(true); }}
                  sx={{ height: 250, objectFit: "cover", objectPosition: "center" }}
                />

                <CardContent>
                  <Typography fontWeight={600} fontSize={15} mb={1}>{cake.name}</Typography>
                  <Typography fontSize={13} color="text.secondary" mb={2}>{cake.desc}</Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700} fontSize={16} color="#f41dec">₹{cake.price}</Typography>
                    {!quantities[cake.id] ? (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAdd(cake.id)}
                        sx={{ borderRadius: 2, bgcolor: "#7b2cbf", "&:hover": { bgcolor: "#6a1ba8" } }}
                      >
                        Add
                      </Button>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "#7b2cbf", borderRadius: 2, px: 0.5 }}>
                        <IconButton size="small" onClick={() => handleDecrement(cake.id)} sx={{ color: "#fff" }}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ color: "#fff", fontWeight: 700, minWidth: 20, textAlign: "center", fontSize: 14 }}>
                          {quantities[cake.id]}
                        </Typography>
                        <IconButton size="small" onClick={() => handleIncrement(cake.id)} sx={{ color: "#fff" }}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CAKE DETAILS MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        {selectedCake && (
          <DialogContent sx={{ p: 3, position: "relative" }}>
            <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8, color: "#666" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box display="flex" gap={3}>
              <Box sx={{ width: 250, flexShrink: 0 }}>
                <Box component="img" src={selectedCake.image} alt={selectedCake.name}
                  sx={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 2, mb: 1 }} />
                <Stack direction="row" spacing={1}>
                  <Box component="img" src={selectedCake.image} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1, border: "2px solid #e91e63", cursor: "pointer" }} />
                  <Box component="img" src={selectedCake.image} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1, cursor: "pointer" }} />
                </Stack>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <Box sx={{ width: 12, height: 12, bgcolor: "#4caf50", borderRadius: "50%" }} />
                  <Typography fontSize={13}>Pure Veg</Typography>
                </Box>
              </Box>

              <Box flex={1}>
                <Typography fontSize={14} fontWeight={600} mb={1}>Flavour <span style={{ color: "red" }}>*</span></Typography>
                <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                  {["Dutch Chocolate", "Gulliver's Gold", "Swiss chocolate"].map((f) => (
                    <Chip key={f} label={f} onClick={() => setFlavor(f)}
                      sx={{ bgcolor: flavor === f ? "#e91e63" : "#f0f0f0", color: flavor === f ? "#fff" : "#000", borderRadius: 8, cursor: "pointer", mb: 1 }} />
                  ))}
                </Stack>

                <Typography fontSize={14} fontWeight={600} mb={1}>Shape <span style={{ color: "red" }}>*</span></Typography>
                <Stack direction="row" spacing={1} mb={2}>
                  <Chip label="Round" onClick={() => setShape("Round")}
                    sx={{ bgcolor: shape === "Round" ? "#e91e63" : "#f0f0f0", color: shape === "Round" ? "#fff" : "#000", borderRadius: 8, cursor: "pointer" }} />
                </Stack>

                <Typography fontSize={14} fontWeight={600} mb={1}>Weight <span style={{ color: "red" }}>*</span></Typography>
                <Stack direction="row" spacing={1} mb={2}>
                  {["0.5 Kg", "1 Kg", "1.5 Kg", "Others"].map((w) => (
                    <Chip key={w} label={w} onClick={() => setWeight(w)}
                      sx={{ bgcolor: weight === w ? "#e91e63" : "#f0f0f0", color: weight === w ? "#fff" : "#000", borderRadius: 8, cursor: "pointer" }} />
                  ))}
                </Stack>

                <Typography fontSize={14} fontWeight={600} mb={1}>Message on Cake</Typography>
                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                  {["Birthday", "Anniversary", "Congratulations"].map((m) => (
                    <Chip key={m} label={m} onClick={() => setMessage(m)} variant="outlined" sx={{ borderRadius: 8, cursor: "pointer", mb: 1 }} />
                  ))}
                </Stack>
                <input type="text" placeholder="Enter your message (max 30 characters)" value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 30))}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "5px" }} />
                <Typography fontSize={12} color="text.secondary" mb={2}>{message.length}/30 characters</Typography>

                <Typography fontSize={11} color="#e91e63" fontStyle="italic" mb={2}>
                  Design and icing of cake may vary from the image shown here since each chef has his/her own way of baking and designing a cake.
                </Typography>

                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
                  <Stack direction="row" spacing={3}>
                    {["Description", "Delivery Details", "Care Instructions"].map((t, i) => (
                      <Typography key={t} onClick={() => setTab(i)}
                        sx={{ pb: 1, borderBottom: tab === i ? "2px solid #e91e63" : "none", color: tab === i ? "#e91e63" : "#666", cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 600 : 400 }}>
                        {t}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
                <Typography fontSize={12} color="text.secondary" mb={2}>
                  {tab === 0 && selectedCake.desc}
                  {tab === 1 && "The delicious cake is hand-delivered by our delivery boy in a good quality cardboard box.\n\nCandle and knife will be delivered as per the availability."}
                  {tab === 2 && "Store cream cakes in a refrigerator. Fondant cakes should be stored in an air conditioned environment."}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} pt={2} borderTop="1px solid #eee">
              <Typography fontSize={28} fontWeight={700} color="#e91e63">₹{selectedCake.price}.00</Typography>
              <Stack direction="row" spacing={1}>
                <Button onClick={handleAddToCart} variant="outlined" sx={{ borderRadius: 8, borderColor: "#e91e63", color: "#e91e63", px: 3 }}>Add to Cart</Button>
                <Button onClick={handleCheckout} variant="contained" sx={{ borderRadius: 8, bgcolor: "#e91e63", "&:hover": { bgcolor: "#c2185b" }, px: 3 }}>Checkout</Button>
              </Stack>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      {/* ADDED TO CART POPUP */}
      <Dialog open={showPopup} onClose={() => setShowPopup(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2, p: 1 } }}>
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
          <Button onClick={() => { setShowPopup(false); router.push("/cart"); }} startIcon={<ShoppingCartIcon />}
            sx={{ bgcolor: "#7b2cbf", color: "#fff", textTransform: "none", "&:hover": { bgcolor: "#6a1ba8" } }}>
            View Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
