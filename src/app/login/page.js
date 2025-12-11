"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email field
    if (!formData.email.trim()) {
      alert("Email is required!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Validate password field
    if (!formData.password.trim()) {
      alert("Password is required!");
      return;
    }

    // Get stored credentials from localStorage
    const storedCredentials = localStorage.getItem('userCredentials');

    if (!storedCredentials) {
      alert("No account found. Please sign up first!");
      return;
    }

    const { email: storedEmail, password: storedPassword } = JSON.parse(storedCredentials);

    // Validate credentials
    if (formData.email === storedEmail && formData.password === storedPassword) {
      console.log("Login successful:", formData);
      router.push("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
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
        minHeight: "100vh",
        bgcolor: "#fce4ec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 9,
        position: "relative"
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          width: "100%",
          height: 500,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center"
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
          placeholder="Email Address"
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
          placeholder="Password"
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
          label={<Typography fontSize={14} color="black">Remember me</Typography>}
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

      <Box
        component="img"
        src="/ccc.jpg"
        alt="Avatar"
        sx={{
          width: 300,
          height: 500,
          objectFit: "cover",
          position: "absolute",
          right: 150,
          top: "50%",
          transform: "translateY(-50%)",
          display: { xs: "none", lg: "block" }
        }}
      />
    </Box>
  );
}
