"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false
      });
      
      if (result?.error) {
        toast.error('Google sign-in failed');
      } else if (result?.ok) {
        toast.success('Signed in successfully!');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || data.message || "Login failed!");
        return;
      }

      toast.success(data.message || "Login successful!");

      // 🔥 Save authentication data
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("isLoggedIn", "true");

      // Redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      color: "#000"
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
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 1.5
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" color="#f06292">
            🍰 Sweet Dreams
          </Typography>
          <Typography variant="h6" color="#424242">
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="#666">
            Sign in to your account
          </Typography>
        </Box>

        <TextField
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          name="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Box textAlign="right">
          <Link href="/forgot-password" style={{ color: "#f06292", fontSize: 13 }}>
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: "#f06292",
            "&:hover": { bgcolor: "#ec407a" },
            fontWeight: "bold",
            textTransform: "none",
            fontSize:"16px"
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
          <Box sx={{ flex: 1, height: 1, bgcolor: "#e0e0e0" }} />
          <Typography variant="body2" color="text.secondary">OR</Typography>
          <Box sx={{ flex: 1, height: 1, bgcolor: "#e0e0e0" }} />
        </Box>

        <Button
          variant="outlined"
          onClick={handleGoogleSignIn}
          sx={{
            borderColor: "#dadce0",
            color: "#3c4043",
            textTransform: "none",
            fontWeight: 500,
            py: 1.2,
            "&:hover": { 
              borderColor: "#d2e3fc",
              bgcolor: "#f8f9fa"
            }
          }}
        >
          <Box component="img" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" sx={{ width: 18, height: 18, mr: 1.5 }} />
          Sign in with Google
        </Button>

        <Box textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#f06292", fontWeight: "bold" }}>
              Sign up here
            </Link>
          </Typography>
        </Box>

        <Box textAlign="center">
          <Link href="/" style={{ color: "#f06292" }}>
            ← Back to Home
          </Link>
        </Box>
      </Box>

      <Toaster position="top-right" />

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