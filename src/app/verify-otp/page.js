"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button
} from "@mui/material";

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  // Get email from localStorage (saved from previous page)
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("forgot_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (!paste.every((char) => /^\d$/.test(char))) return;

    setOtp(paste);
    inputsRef.current[5].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/forgot-password/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            otp: enteredOtp
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      alert(data.message || "OTP Verified Successfully");
      router.push("/reset-password");

    } catch (error) {
      console.error("OTP ERROR:", error);
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
        onSubmit={handleVerify}
        sx={{
          maxWidth: 420,
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#f06292" mb={1}>
          OTP Verification
        </Typography>

        <Typography color="#666" mb={3}>
          Enter the 6-digit OTP sent to your email
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={3} onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              sx={{
                width: 48,
                "& .MuiOutlinedInput-root": {
                  height: 50,
                },
              }}
            />
          ))}
        </Box>

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
          Verify OTP
        </Button>
      </Box>
    </Box>
  );
}
