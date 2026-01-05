"use client";

import { useState } from "react";
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
  const router = useRouter();

  const handleReset = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Update password in localStorage
    const credentials = JSON.parse(
      localStorage.getItem("userCredentials") || '{}'
    );

    localStorage.setItem(
      "userCredentials",
      JSON.stringify({
        ...credentials,
        password
      })
    );

    alert("Password updated successfully!");
    router.push("/login");
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
            fontWeight: "",
           fontFamily: "var(--font-geist-sans)",
           fontStyle: "normal" // 👈 ADD THIS
          }}
        >
          Update Password
        </Button>
      </Box>
    </Box>
  );
}
