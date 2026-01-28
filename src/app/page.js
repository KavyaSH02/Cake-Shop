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
        <source src="/cakeee.mp4" type="video/mp4" />
      </Box>

      {/* Dark overlay */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />

      {/* Top Right - Login/Register Buttons */}
      <Box sx={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        p: 3
      }}>
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <Button
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              px: 3,
              py: 1,
              fontWeight: 500,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
            }}
          >
            Login
          </Button>
        </Link>

        <Link href="/signup" style={{ textDecoration: 'none' }}>
          <Button
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              px: 3,
              py: 1,
              fontWeight: 500,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
            }}
          >
            Register
          </Button>
        </Link>
      </Box>

      {/* Content */}
      <Box sx={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        color: 'white',
        px: 2,
        mt: 'auto',
        mb: 8
      }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
          Welcome to Sweetest
        </Typography>
        <Typography variant="h6" sx={{ color: '#e4d7d7ff' }}>
          Explore the sweet life
        </Typography>
      </Box>
    </Box>
  );
}