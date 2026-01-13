"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  // Fetch saved email from localStorage (from OTP step)
  useEffect(() => {
    const savedEmail = localStorage.getItem("forgot_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to reset password");
        return;
      }

      alert(data.message || "Password reset successfully!");

      // Clear localStorage after success
      localStorage.removeItem("forgot_email");

      router.push("/login");

    } catch (error) {
      console.error("RESET ERROR:", error);
      alert("Server error. Try again.");
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
      }}
    >
      <Box
        component="form"
        onSubmit={handleReset}
        sx={{
          maxWidth: 420,
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#f06292"
          textAlign="center"
          mb={3}
        >
          Reset Password
        </Typography>

        <TextField
          fullWidth
          placeholder="New Password"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#f06292",
            "&:hover": { bgcolor: "#ec407a" },
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          Update Password
        </Button>
      </Box>
    </Box>
  );
}
