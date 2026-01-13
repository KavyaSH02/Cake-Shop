"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Typography, TextField, Button } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: ""
  });
  const otpRefs = useRef([]);

  // -----------------------------
  // STEP 1 → SEND OTP
  // -----------------------------
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/forgot-password/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      console.log('Server response:', data); // Debug log

      if (!res.ok) {
        const errorMessage = data.detail || data.message || "Failed to send OTP";
        console.log('Showing error:', errorMessage); // Debug log
        toast.error(errorMessage);
        return;
      }

      // Display the actual server message
      const successMessage = data.detail || data.message || "OTP has been sent to your email!";
      console.log('Showing success:', successMessage); // Debug log
      toast.success(successMessage);
      setStep(2);

    } catch (error) {
      toast.error("Server error while sending OTP");
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData({ ...formData, otp: newOtp });

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // -----------------------------
  // STEP 2 → VERIFY OTP
  // -----------------------------
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const otpString = formData.otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: otpString,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || data.message || "Invalid OTP");
        return;
      }

      toast.success(data.detail || data.message || "OTP verified!");
      setStep(3);

    } catch (error) {
      toast.error("Server error while verifying OTP");
    }
  };

  // -----------------------------
  // STEP 3 → RESET PASSWORD
  // -----------------------------
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Password reset successfully!");
    router.push("/login");
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
        px: 2
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 4
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="#f06292">
            🍰 Sweet Dreams
          </Typography>
          <Typography variant="h6" color="#424242" mt={1}>
            Reset Password
          </Typography>
        </Box>

        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <Box component="form" onSubmit={handleEmailSubmit}>
            <Typography variant="body2" color="#666" mb={2}>
              Enter your email to receive an OTP
            </Typography>
            <TextField
              name="email"
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#f06292",
                "&:hover": { bgcolor: "#ec407a" },
                py: 1
              }}
            >
              Send OTP
            </Button>
          </Box>
        )}

        {/* STEP 2 - OTP */}
        {step === 2 && (
          <Box component="form" onSubmit={handleOtpSubmit}>
            <Typography variant="body2" color="#666" mb={2} textAlign="center">
              Enter the OTP sent to your email
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                mb: 3
              }}
            >
              {formData.otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (otpRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    },
                  }}
                  sx={{
                    width: 50,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#f06292" },
                      "&.Mui-focused fieldset": { borderColor: "#f06292" },
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#f06292",
                "&:hover": { bgcolor: "#ec407a" },
                py: 1
              }}
            >
              Verify OTP
            </Button>
          </Box>
        )}

        {/* STEP 3 - RESET PASSWORD */}
        {step === 3 && (
          <Box component="form" onSubmit={handlePasswordSubmit}>
            <Typography variant="body2" color="#666" mb={2}>
              Set your new password
            </Typography>

            <TextField
              name="newPassword"
              placeholder="New Password"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#f06292",
                "&:hover": { bgcolor: "#ec407a" },
                py: 1
              }}
            >
              Reset Password
            </Button>
          </Box>
        )}

        <Box textAlign="center" mt={3}>
          <Link href="/login" style={{ color: "#f06292", textDecoration: "none" }}>
            ← Back to Login
          </Link>
        </Box>
      </Box>

      <Toaster position="top-right" />
    </Box>
  );
}
