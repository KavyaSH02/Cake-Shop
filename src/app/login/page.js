"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // 🔹 Handle Google Sign-In with NextAuth
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        toast.error(result.error || "Failed to sign in with Google");
      } else if (result?.ok) {
        toast.success("Welcome! Signing you in...");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  // 🔹 Email / Password Login
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

      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error(data.error || "Invalid credentials!");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", formData.email);
      if (data.token) localStorage.setItem("authToken", data.token);

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Logo Component
  const GoogleLogo = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      height: 42,
      "&:hover fieldset": { borderColor: "#f06292" },
      "&.Mui-focused fieldset": { borderColor: "#f06292" }
    },
    "& .MuiOutlinedInput-input": {
      padding: "0 12px",
      fontSize: 14
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
        {/* Header */}
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" color="#f06292">
            🍰 Sweet Dreams
          </Typography>
          <Typography variant="h6">Welcome Back!</Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        {/* Email */}
        <TextField
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        {/* Password */}
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

        {/* OR Divider */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box flex={1} height="1px" bgcolor="#e0e0e0" />
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
          <Box flex={1} height="1px" bgcolor="#e0e0e0" />
        </Box>

        {/* Google Sign In */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          sx={{
            height: 42,
            textTransform: "none",
            fontWeight: 600,
            borderColor: "#ddd",
            color: "#000",
            "&:hover": { bgcolor: "#f5f5f5" }
          }}
        >
          {googleLoading ? (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          ) : (
            <Box sx={{ mr: 1 }}>
              <GoogleLogo />
            </Box>
          )}
          {googleLoading ? "Signing in..." : "Sign in with Google"}
        </Button>

        {/* Forgot Password */}
        <Box textAlign="right">
          <Link href="/forgot-password" style={{ color: "#f06292", fontSize: 13 }}>
            Forgot password?
          </Link>
        </Box>

        {/* Login Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: "#f06292",
            "&:hover": { bgcolor: "#ec407a" },
            fontWeight: "bold"
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        {/* Signup */}
        <Box textAlign="center">
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#f06292", fontWeight: "bold" }}>
              Sign up here
            </Link>
          </Typography>
        </Box>

        {/* Back Home */}
        <Box textAlign="center">
          <Link href="/" style={{ color: "#f06292" }}>
            ← Back to Home
          </Link>
        </Box>
      </Box>

      <Toaster position="top-right" />

      {/* Side Image */}
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
