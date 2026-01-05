"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Typography, TextField, Button } from "@mui/material";

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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    // Mock email validation
    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    alert('OTP sent to your email! Use 123456 as OTP for demo.');
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData({ ...formData, otp: newOtp });
    
    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    const otpString = formData.otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter complete 6-digit OTP');
      return;
    }
    
    // Mock OTP verification (accept 123456)
    if (otpString === '123456') {
      alert('OTP verified! Set your new password.');
      setStep(3);
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Update password in localStorage
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const user = JSON.parse(storedCredentials);
      if (user.email === formData.email) {
        localStorage.setItem('userCredentials', JSON.stringify({
          ...user,
          password: formData.newPassword
        }));
      }
    }

    alert('Password reset successfully! You can now login.');
    router.push('/login');
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

        {step === 1 && (
          <Box component="form" onSubmit={handleEmailSubmit}>
            <Typography variant="body2" color="#666" mb={2}>
              Enter your email address to receive an OTP
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

        {step === 2 && (
          <Box component="form" onSubmit={handleOtpSubmit}>
            <Typography variant="body2" color="#666" mb={2} textAlign="center">
              Enter the 6-digit OTP sent to your email
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
                      textAlign: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }
                  }}
                  sx={{
                    width: 50,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#f06292' },
                      '&.Mui-focused fieldset': { borderColor: '#f06292' }
                    }
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
    </Box>
  );
}