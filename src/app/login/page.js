"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false); // ✅ added

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      alert("Email is required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (!formData.password.trim()) {
      alert("Password is required!");
      return;
    }

    // Check credentials from localStorage
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const user = JSON.parse(storedCredentials);
      if (user.email === formData.email) {
        alert('Login successful!');
        router.push("/dashboard");
        return;
      }
    }
    
    alert('Invalid credentials. Please sign up first.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ shared input style (added)
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      height: 42,
      display: "flex",
      alignItems: "center",
      "&:hover fieldset": { borderColor: "#f06292" },
      "&.Mui-focused fieldset": { borderColor: "#f06292" }
    },
    "& .MuiOutlinedInput-input": {
      height: "100%",
      padding: "0 12px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      color: "#000" // ✅ same text color
    },
    "& input::placeholder": {
      fontSize: "14px",
      opacity: 0.6
    }
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
          maxWidth: 420,
          width: "100%",
          height: "auto",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
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

        {/* Email */}
        <TextField
          variant="outlined"
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          sx={inputStyles}
        />

       
        {/* Password */}
<TextField
  variant="outlined"
  name="password"
  placeholder="Password"
  type={showPassword ? "text" : "password"}
  value={formData.password}
  onChange={handleChange}
  required
  fullWidth
  sx={inputStyles}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>

{/* Forgot Password */}
<Box textAlign="right" mt={0.3}>
  <Link
    href="/forgot-password"
    style={{
      fontSize: "13px",
      color: "#f06292",
      fontWeight: 500,
      textDecoration: "none",
    }}
  >
    Forgot password?
  </Link>
</Box>


       

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#f06292",
            "&:hover": { bgcolor: "#ec407a" },
            color: "white",
            py: 0.8,
            fontWeight: "bold"
          }}
        >
          Sign In
        </Button>

        <Box textAlign="center" mt={1.5}>
          <Typography variant="body2" color="#666">
            Don't have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "#f06292",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Sign up here
            </Link>
          </Typography>
        </Box>

        <Box textAlign="center" mt={0.1}>
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
