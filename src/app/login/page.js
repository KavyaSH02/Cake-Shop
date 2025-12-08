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
        bgcolor: "#fce4ec",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4
      }}
    >

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 430,
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" color="#f06292" gutterBottom>
            🍰 Sweet Dreams
          </Typography>
          <Typography variant="h6" fontWeight="semibold" color="#424242" mt={0.5}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="#666">
            Sign in to your account
          </Typography>
        </Box>

        <TextField
          variant="outlined"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#f06292" },
              "&.Mui-focused fieldset": { borderColor: "#f06292" }
            }

          }}
        />

        <TextField
          variant="outlined"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#f06292" },
              "&.Mui-focused fieldset": { borderColor: "#f06292" }
            }
          }}
        />

        <FormControlLabel
          control={<Checkbox sx={{ color: "#f06292" }} />}
          label={<Typography fontSize={14}>Remember me</Typography>}
          sx={{ alignSelf: "start" }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#f06292",
            "&:hover": { bgcolor: "#ec407a" },
            color: "white",
            py: 1,
            fontWeight: "bold"
          }}
        >
          Sign In
        </Button>

        <Box textAlign="center" mt={1.5}>
          <Typography variant="body2" color="#666">
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#f06292", fontWeight: "bold", textDecoration: "none" }}>
              Sign up here
            </Link>
          </Typography>
        </Box>

        <Box textAlign="center" mt={0.5}>
          <Link href="/" style={{ color: "#f06292", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
