"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button
} from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";


export default function CakesPage() {
  const router = useRouter();
  const cakes = [
    {
      id: 1,
      name: "Special Designer Mini Choco Ball Round",
      desc: "Special Designer Mini Choco Ball Round Cake",
      price: 775,
      image: "/choo.jpg"
    },
    {
      id: 2,
      name: "Special Designer Choco Vanilla Chips",
      desc: "Exotic Butterscotch Caramello Cake",
      price: 775,
      image: "/weee.jpg"
    },
    {
      id: 3,
      name: "Special Designer Choco Stick Round",
      desc: "Exotic Devils Delight Cake",
      price: 775,
      image: "/he.jpg"
    },
    {
      id: 4,
      name: "Special Designer Dual Layer Heart",
      desc: "Fig & Honey Round Cake",
      price: 775,
      image: "/choco.jpg"
    },
     {
      id: 5,
      name: "Special Designer Dual Layer Heart",
      desc: "Fig & Honey Round Cake",
      price: 775,
      image: "/heee.jpg"
    },
     {
      id: 6,
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
                sx={{ 
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
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

      {/* ================= BOTTOM DECOR IMAGE ================= */}
      <Box
        component="img"
        src="/bottom-decor.png"
        alt="Bottom Decor"
        sx={{ width: "100%", maxHeight: 180, objectFit: "cover" }}
      />
    </Box>
  );
}
