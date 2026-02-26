"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Typography, Button, Box } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Home() {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          
        }}
      >
        <source src="/cake-video.mp4" type="video/mp4" />
      </Box>

      {/* Dark overlay */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />

      {/* Top Right - Login/Register Buttons */}
     {/* Top Right - Login/Register Buttons */}
<Box
  sx={{
    position: "relative",
    zIndex: 10,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
    p: 3,
  }}
>
  {/* Login */}
  <Link href="/login" style={{ textDecoration: "none" }}>
    <Button
      sx={{
        color: "white",
        px: 2,
        py: -1,
        borderRadius: "999px",
        border: "1.5px solid rgba(255,255,255,0.6)",
        fontWeight: 500,
        textTransform: "none",
        backdropFilter: "blur(6px)",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.1)",
        },
      }}
    >
      Login
    </Button>
  </Link>

  {/* Sign Up */}
  <Link href="/signup" style={{ textDecoration: "none" }}>
    <Button
      sx={{
        px: 2,
        py: -1,
        borderRadius: "999px",
        fontWeight: 600,
        textTransform: "none",
        color: "#3b1d1d",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        boxShadow: "0 8px 25px rgba(255,154,158,0.4)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 30px rgba(255,154,158,0.6)",
        },
      }}
    >
      Sign Up
    </Button>
  </Link>
</Box>


      {/* Content */}
      {/* Content */}
<Box
  sx={{
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    color: "white",
    px: 2,
    mt: 12, // 🔼 move content upward
  }}
>
  {/* Welcome text */}
  <Typography
    sx={{
      fontSize: { xs: "20px", sm: "26px" },
      letterSpacing: "4px",
      color: "#f5dcdc",
      textTransform: "uppercase",
      mb: -3,
    }}
  >
    Welcome to
  </Typography>

  {/* Brand name */}
  <Typography
    sx={{
      fontSize: { xs: "42px", sm: "60px", md: "72px" },
      fontWeight: 800,
      background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      mb: 1,
    }}
  >
    Sweetest
  </Typography>

  {/* Tagline */}
  <Typography
    sx={{
      fontSize: { xs: "14px", sm: "18px" },
      color: "#e4d7d7",
      letterSpacing: "1px",
      mb:18
    }}
  >
    Explore the sweet life
  </Typography>
</Box>

    </Box>
  );
}