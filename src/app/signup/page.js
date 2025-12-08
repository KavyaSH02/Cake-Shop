"use client";
import { useState } from "react";
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
        px: 2,
        position: "relative"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 600,
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
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" fontWeight="bold" color="#f06292" gutterBottom>
              🍰 Sweet Dreams
            </Typography>
            <Typography variant="h5" fontWeight="semibold" color="#424242" mt={2}>
              Join Us!
            </Typography>
            <Typography variant="body1" color="#666">
              Create your account
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="firstName"
                label="First Name"
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
                label="Last Name"
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
            label="Email Address"
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
            label="Phone Number (optional)"
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
            label="Password"
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
            label="Confirm Password"
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

          <FormControlLabel
            control={<Checkbox required sx={{ color: "#f06292" }} />}
            label={<Typography fontSize={14}>I agree to the Terms of Service and Privacy Policy</Typography>}
            sx={{ alignSelf: "start" }}
          />

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

          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="#666">
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#f06292", fontWeight: "bold", textDecoration: "none" }}>
                Sign in here
              </Link>
            </Typography>
          </Box>

          <Box textAlign="center" mt={1}>
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
            height: 600,
            width: "auto",
            objectFit: "contain",
            position: "absolute",
            top: 16,
            right: 16
          }}
        />
      </Box>
    </Box>
  );
}