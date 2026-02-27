"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  IconButton
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Existing validation (UNCHANGED)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      setLoading(true);

      // 🔹 API CALL
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  phone: formData.phone || "",
  password: formData.password
})

      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Signup failed!");
        return;
      }

     toast.success(data.message || "Account created successfully!");

setTimeout(() => {
  router.push("/login");
}, 800);


    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      const nameValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({ ...formData, [name]: nameValue });
    } else if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      color: "#434242"
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
        px: 2,
        position: "relative"
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 550,
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" color="#f06292">
            🍰 Sweet Dreams
          </Typography>
          <Typography variant="h6" color="#424242">
            Join Us!
          </Typography>
          <Typography variant="body2" color="#666">
            Create your account
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
          <TextField
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
        </Box>

        <TextField
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          size="small"
        />

        <TextField
          name="phone"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          size="small"
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

        <TextField
          name="confirmPassword"
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
          sx={inputStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox required sx={{ color: "#f06292", padding: 0 }} />
          <Typography fontSize={14}>
            I agree to the Terms of Service and Privacy Policy
          </Typography>
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
            fontSize:"15px"
          }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <Box textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#f06292", fontWeight: "bold" }}>
              Sign in here
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
          display: { xs: "none", md: "block" }
        }}
      />
    </Box>
  );
}
