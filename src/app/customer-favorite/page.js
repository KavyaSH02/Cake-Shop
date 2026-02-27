"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  Chip,
  Stack
} from "@mui/material";



export default function CakesPage() {
const [open, setOpen] = useState(false);
const [selectedCake, setSelectedCake] = useState(null);
const [weight, setWeight] = useState("0.5");
const [flavor, setFlavor] = useState("Dutch Chocolate");
const [shape, setShape] = useState("Round");
const [message, setMessage] = useState("");
const [tab, setTab] = useState(0);

  const router = useRouter();
  
  const handleAddToCart = async () => {
    try {
      console.log("Adding to cart:", {
        id: selectedCake.id,
        name: selectedCake.name,
        price: selectedCake.price,
        flavor: flavor,
        shape: shape,
        weight: weight,
        message: message
      });

      const res = await fetch("http://127.0.0.1:8000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedCake.id,
          quantity: 1
        })
      });
      
      const data = await res.json();
      console.log("API Response:", data);
      
      if (res.ok) {
        alert("Added to cart successfully!");
        setOpen(false);
        router.push("/cart");
      } else {
        alert("Failed to add to cart: " + (data.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Error: " + error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedCake.id,
          quantity: 1
        })
      });
      
      if (res.ok) {
        setOpen(false);
        router.push("/checkout");
      } else {
        const data = await res.json();
        alert("Failed to add to cart: " + (data.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
      alert("Error: " + error.message);
    }
  };

  const cakes = [
    {
      id: 801,
      name: "Special Designer Mini Choco Ball Round",
      desc: "Special Designer Mini Choco Ball Round Cake",
      price: 775,
      image: "/choo.jpg"
    },
    {
      id: 802,
      name: "Special Designer Choco Vanilla Chips",
      desc: "Exotic Butterscotch Caramello Cake",
      price: 775,
      image: "/weee.jpg"
    },
    {
      id: 803,
      name: "Special Designer Choco Stick Round",
      desc: "Exotic Devils Delight Cake",
      price: 775,
      image: "/he.jpg"
    },
    {
      id: 804,
      name: "Special Designer Dual Layer Heart",
      desc: "Fig & Honey Round Cake",
      price: 775,
      image: "/choco.jpg"
    },
     {
      id: 805,
      name: "Special Designer Dual Layer Heart",
      desc: "Fig & Honey Round Cake",
      price: 775,
      image: "/heee.jpg"
    },
     {
      id: 806,
      name: "Special Designer Dual Layer Heart",
      desc: "Fig & Honey Round Cake",
      price: 775,
      image: "/ani.jpg"
    }
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
{/* ===== BACK BUTTON ===== */}
<Box
  onClick={() => router.back()}
  sx={{
    position: "fixed",
    top: 14,
    left: 10,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: "2px",            // spacing in px
    px: "4px",            // horizontal padding
    py: "4px",             // vertical padding
    bgcolor: "#ffe4e9",
    borderRadius: "12px",   // rectangle shape
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "#ffc0cb"
    }
  }}
>
  <ArrowBackIosNewIcon
    sx={{
      fontSize: "14px",     // 👈 icon size in px
      color: "#7b2cbf"      // 👈 icon color
    }}
  />

  <Typography
    sx={{
      fontSize: "13px",     // 👈 text size in px
      fontWeight: 300,
      color: "#7b2cbf",     // 👈 text color
      lineHeight: "1"
    }}
  >
    {/* Back */}
  </Typography>
</Box>


      {/* ================= TOP DECOR IMAGE ================= */}
      {/* <Box
        component="img"
        src=""
        alt="Top Decor"
        sx={{ width: "100%", maxHeight: 50, objectFit: "cover" }}
      /> */}

      {/* ================= HERO / BANNER ================= */}
<Box
  sx={{
    background: "linear-gradient(90deg, #ffc0cb 0%, #ffe4e9 100%)",
    minHeight: "auto",
    py: -3,
    display: "flex",
    alignItems: "center",
    px: { xs: 2, md: 2 },
    position: "relative",
    overflow: "hidden"
  }}
>
  {/* Floating Hearts */}
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
    {/* LEFT – THREE CAKE IMAGES */}
    <Grid item xs={12} md={7}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "flex-end",
          mr:25
          
        }}
      >
        
        {/* <Box
          component="img"
          src="/cakes.jpg"
          alt="Wedding Cake 3"
          sx={{
            width: { xs: 120, md: 200 },
            height: { xs: 180, md: 300 },
            objectFit: "contain"
          }}
        /> */}
      </Box>
    </Grid>

    {/* RIGHT – TEXT */}
    <Grid item xs={12} md={5}>
      <Typography
        sx={{
          fontSize: { xs: "2rem", md: "3.5rem" },
          fontWeight: 200,
          fontStyle: "italic",
          color: "#7b2cbf",
          lineHeight: 1.3,
          fontFamily: "'Brush Script MT', cursive",
          mb: 2,   // 👈 FIXED
          
        }}
      >
        Make Your Big Day
        <br />
        Sweeter with Monginis
        Wedding Cakes !
      </Typography>
    </Grid>
  </Grid>
</Box>



      {/* ================= CAKE CARDS ================= */}
      <Box px={{ xs: 2, md: 6 }} py={5} sx={{ bgcolor: "#fff" }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          ✨ Cakes
        </Typography>

        <Grid container spacing={3}>
          {cakes.map((cake) => (
            <Grid item xs={12} sm={6} md={3} key={cake.id}>
              <Card
  onClick={() => {
    setSelectedCake(cake);
    setWeight("0.5"); // default
    setOpen(true);
  }}
  sx={{
    cursor: "pointer",
    borderRadius: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    "&:hover": { transform: "translateY(-4px)" },
  }}
>

                <CardMedia
                  component="img"
                  image={cake.image}
                  alt={cake.name}
                  sx={{
                    height: 250,
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />

                <CardContent>
                  <Typography fontWeight={600} fontSize={15} mb={1}>
                    {cake.name}
                  </Typography>

                  <Typography fontSize={13} color="text.secondary" mb={2}>
                    {cake.desc}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={700} fontSize={16} color="#f41dec">
                      ₹{cake.price}
                    </Typography>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{ 
                        borderRadius: 2,
                        bgcolor: "#7b2cbf",
                        "&:hover": { bgcolor: "#6a1ba8" }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* ===== CAKE DETAILS MODAL ===== */}
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  maxWidth="md"
  fullWidth
>
  {selectedCake && (
    <DialogContent sx={{ p: 3, position: "relative" }}>
      <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 8, right: 8, color: "#666" }}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <Box display="flex" gap={3}>
        {/* LEFT - SMALL IMAGE */}
        <Box sx={{ width: 250, flexShrink: 0 }}>
          <Box
            component="img"
            src={selectedCake.image}
            alt={selectedCake.name}
            sx={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 2, mb: 1 }}
          />
          {/* Thumbnail Gallery */}
          <Stack direction="row" spacing={1}>
            <Box component="img" src={selectedCake.image} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1, border: "2px solid #e91e63", cursor: "pointer" }} />
            <Box component="img" src={selectedCake.image} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1, cursor: "pointer" }} />
          </Stack>
          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <Box sx={{ width: 12, height: 12, bgcolor: "#4caf50", borderRadius: "50%" }} />
            <Typography fontSize={13}>Pure Veg</Typography>
          </Box>
        </Box>

        {/* RIGHT - CONTENT */}
        <Box flex={1}>
          {/* Flavour */}
          <Typography fontSize={14} fontWeight={600} mb={1}>Flavour <span style={{color: 'red'}}>*</span></Typography>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            {["Dutch Chocolate", "Gulliver's Gold", "Swiss chocolate"].map(f => (
              <Chip key={f} label={f} onClick={() => setFlavor(f)} 
                sx={{bgcolor: flavor === f ? "#e91e63" : "#f0f0f0", color: flavor === f ? "#fff" : "#000", borderRadius: 8, cursor: "pointer", mb: 1}} />
            ))}
          </Stack>

          {/* Shape */}
          <Typography fontSize={14} fontWeight={600} mb={1}>Shape <span style={{color: 'red'}}>*</span></Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip label="Round" onClick={() => setShape("Round")} 
              sx={{bgcolor: shape === "Round" ? "#e91e63" : "#f0f0f0", color: shape === "Round" ? "#fff" : "#000", borderRadius: 8, cursor: "pointer"}} />
          </Stack>

          {/* Weight */}
          <Typography fontSize={14} fontWeight={600} mb={1}>Weight <span style={{color: 'red'}}>*</span></Typography>
          <Stack direction="row" spacing={1} mb={2}>
            {["0.5 Kg", "1 Kg", "1.5 Kg", "Others"].map(w => (
              <Chip key={w} label={w} onClick={() => setWeight(w)} 
                sx={{bgcolor: weight === w ? "#e91e63" : "#f0f0f0", color: weight === w ? "#fff" : "#000", borderRadius: 8, cursor: "pointer"}} />
            ))}
          </Stack>

          {/* Message on Cake */}
          <Typography fontSize={14} fontWeight={600} mb={1}>Message on Cake</Typography>
          <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
            {["Birthday", "Anniversary", "Congratulations"].map(m => (
              <Chip key={m} label={m} onClick={() => setMessage(m)} variant="outlined" sx={{borderRadius: 8, cursor: "pointer", mb: 1}} />
            ))}
          </Stack>
          <input type="text" placeholder="Enter your message (max 30 characters)" value={message} onChange={(e) => setMessage(e.target.value.slice(0, 30))}
            style={{width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "5px"}} />
          <Typography fontSize={12} color="text.secondary" mb={2}>{message.length}/30 characters</Typography>
          
          <Typography fontSize={11} color="#e91e63" fontStyle="italic" mb={2}>
            Design and icing of cake may vary from the image shown here since each chef has his/her own way of baking and designing a cake.
          </Typography>

          {/* Tabs */}
          <Box sx={{borderBottom: 1, borderColor: "divider", mb: 1}}>
            <Stack direction="row" spacing={3}>
              {["Description", "Delivery Details", "Care Instructions"].map((t, i) => (
                <Typography key={t} onClick={() => setTab(i)} sx={{pb: 1, borderBottom: tab === i ? "2px solid #e91e63" : "none", color: tab === i ? "#e91e63" : "#666", cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 600 : 400}}>{t}</Typography>
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

      {/* BOTTOM - PRICE & ACTIONS */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} pt={2} borderTop="1px solid #eee">
        <Typography fontSize={28} fontWeight={700} color="#e91e63">₹{selectedCake.price}.00</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={handleAddToCart} variant="outlined" sx={{borderRadius: 8, borderColor: "#e91e63", color: "#e91e63", px: 3}}>Add to Cart</Button>
          <Button onClick={handleCheckout} variant="contained" sx={{borderRadius: 8, bgcolor: "#e91e63", "&:hover": {bgcolor: "#c2185b"}, px: 3}}>Checkout</Button>
        </Stack>
      </Box>
    </DialogContent>
  )}
</Dialog>
    </Box>
  );
}
