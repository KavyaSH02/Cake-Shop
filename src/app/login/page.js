"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    alert("Login functionality will be implemented with backend!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "#f0f0f0"
      }}
    >
      {/* Background Image with blur */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/cc.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)", // Adjust this value to control blur amount
          zIndex: 0
        }}
      />

      {/* Optional dark overlay for contrast */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.25)", // adjust darkness here
          zIndex: 1
        }}
      />

      {/* Form container */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 400,
          px: 4,
          py: 6,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          color: "white"
          // No background or card styling here, fully transparent
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#f06292" textAlign="center" gutterBottom>
           Sweet Dreams
        </Typography>
        <Typography variant="h5" fontWeight="medium" color="white" textAlign="center" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" textAlign="center" color="white" mb={2}>
          Sign in to your account
        </Typography>

        <TextField
          variant="filled"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            input: { color: "white" },
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 1,
            "& .MuiFilledInput-underline:before": { borderBottomColor: "rgba(255,255,255,0.3)" },
            "& .MuiFilledInput-underline:hover:before": { borderBottomColor: "white" }
          }}
        />

        <TextField
          variant="filled"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          InputLabelProps={{ style: { color: "white" } }}
          sx={{
            input: { color: "white" },
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 1,
            "& .MuiFilledInput-underline:before": { borderBottomColor: "rgba(255,255,255,0.3)" },
            "& .MuiFilledInput-underline:hover:before": { borderBottomColor: "white" }
          }}
        />

        <FormControlLabel
          control={<Checkbox sx={{ color: "white" }} />}
          label={<Typography color="white" fontSize={14}>Remember me</Typography>}
          sx={{ alignSelf: "start" }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#f06292",
            "&:hover": { bgcolor: "#ec407a" },
            color: "white",
            py: 1.5,
            fontWeight: "bold"
          }}
        >
          Sign In
        </Button>

        <Box textAlign="center" color="white" mt={2} fontSize={14}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "#f06292", fontWeight: "bold", textDecoration: "none" }}>
            Sign up here
          </Link>
        </Box>

        <Box textAlign="center" color="white" mt={1} fontSize={14}>
          <Link href="/" style={{ color: "#f06292", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
