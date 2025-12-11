"use client";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Load existing user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleSave = () => {
    // Save updated info in localStorage
    localStorage.setItem("user", JSON.stringify({ name, email }));
    alert("Profile updated successfully!");
    router.push("/profile"); // go back to profile page
  };

    return (
      <Box
      sx={{
        bgcolor: "#fce4ec",// <-- full page background color here
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 5, // optional padding top
      }}
    >
    
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 10,
        p: 4,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography fontWeight={700} fontSize="24px" sx={{ mb: 3 }}>
        Edit Profile
      </Typography>

      <TextField
        label="Name"
        fullWidth
        sx={{ mb: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ bgcolor: "#ff3d6c", "&:hover": { bgcolor: "#e6356a" }, mt: 2 }}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Box>
    </Box>
  );
}
