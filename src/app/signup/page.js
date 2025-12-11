"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate first name
    if (!formData.firstName.trim()) {
      alert("First name is required!");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      alert("First name should only contain letters!");
      return;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      alert("Last name is required!");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      alert("Last name should only contain letters!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Validate phone number (10 digits only)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits!");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Validate password strength
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, and one number!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Store user credentials in localStorage
    localStorage.setItem('userCredentials', JSON.stringify({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName
    }));

    console.log("Signup attempt:", formData);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For name fields, only allow letters and spaces
    if (name === "firstName" || name === "lastName") {
      const nameValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({
        ...formData,
        [name]: nameValue
      });
    }
    // For phone field, only allow numbers and limit to 10 digits
    else if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: numericValue
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 700,
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
          <Box textAlign="center" mb={1}>
            <Typography variant="h5" fontWeight="bold" color="#f06292" gutterBottom>
              🍰 Sweet Dreams
            </Typography>
            <Typography variant="h6" fontWeight="semibold" color="#424242" mt={0.5}>
              Join Us!
            </Typography>
            <Typography variant="body2" color="#666">
              Create your account
            </Typography>
          </Box>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#f06292" },
                    "&.Mui-focused fieldset": { borderColor: "#f06292" }
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#f06292" },
                    "&.Mui-focused fieldset": { borderColor: "#f06292" }
                  }
                }}
              />
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            name="email"
            placeholder="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#f06292" },
                "&.Mui-focused fieldset": { borderColor: "#f06292" }
              }
            }}
          />

          <TextField
            variant="outlined"
            name="phone"
            placeholder="Phone Number (optional)"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            size="small"
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#f06292" },
                "&.Mui-focused fieldset": { borderColor: "#f06292" }
              }
            }}
          />

          <TextField
            variant="outlined"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#f06292" },
                "&.Mui-focused fieldset": { borderColor: "#f06292" }
              }
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox required sx={{ color: "#f06292", padding: 0 }} />
            <Typography fontSize={14} color="black">
              I agree to the Terms of Service and Privacy Policy
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#f06292",
              "&:hover": { bgcolor: "#ec407a" },
              color: "white",
              py: 1,
              fontWeight: "bold"
            }}
          >
            Create Account
          </Button>

          <Box textAlign="center" mt={1}>
            <Typography variant="body2" color="#666">
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#f06292", fontWeight: "bold", textDecoration: "none" }}>
                Sign in here
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
    </Box>
  );
}