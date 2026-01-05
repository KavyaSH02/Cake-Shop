"use client";

import { useState, useRef } from "react";
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

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    // Accept any 6-digit OTP for demo
    if (enteredOtp === "123456") {
      alert("OTP verified successfully!");
      router.push("/reset-password");
    } else {
      alert("Invalid OTP. Use 123456 for demo.");
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
          textAlign: "center"
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#f06292"
          mb={1}
        >
          OTP Verification
        </Typography>

        <Typography color="#666" mb={3}>
          Enter the 6-digit OTP sent to your email
        </Typography>

        {/* OTP Inputs */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={3}
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
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
            fontWeight: "",
           fontFamily: "var(--font-geist-sans)",
           fontStyle: "normal" // 👈 ADD THIS
          }}
        >
          Verify OTP
        </Button>
      </Box>
    </Box>
  );
}
