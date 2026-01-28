"use client";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Box } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Home() {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Background Image */}
      <Image
        src="/cakec.jpg"
        alt="Delicious cake"
        fill
        className="object-cover"
      />

      {/* Dark overlay */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)' }} />

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

        {/* Heading */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#d52421ff' }}>
          Welcome to Sweetest
        </Typography>

        {/* Text + Arrow Button Side by Side */}
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: -3,   // moves the whole line upward
          mb: 10
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e4d7d7ff' }}>
            Explore the sweet life
          </Typography>

          <Link href="/login">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#e63946",
                '&:hover': { bgcolor: "#e63946" },
                borderRadius: "50%",
                minWidth: 30,
                height: 30,
                color: "#e4ddddff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 0,
                mt: -0.5  // moves arrow slightly up inside button
              }}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: 24 ,color: "#e4ddddff"}} />
            </Button>
          </Link>
        </Box>

      </Box>
    </Box>
  );
}
