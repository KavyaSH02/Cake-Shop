"use client";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function EditProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (!token || !email) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/profile?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Update failed");
        return;
      }

      toast.success("Profile updated successfully!");
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#fce4ec",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pt: 5,
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
            position: "relative", // 👈 added
          }}
        >
          {/* Close Icon */}
          <IconButton
            onClick={() => router.push("/dashboard")}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#090909",
              "&:hover": { color: "#534c4e" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography fontWeight={700} fontSize="24px" sx={{ mb: 3 }}>
            Edit Profile
          </Typography>

          <TextField
            label="First Name"
            fullWidth
            sx={{ mb: 2 }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            sx={{ mb: 2 }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            disabled
            sx={{ mb: 2 }}
            value={email}
          />
          <TextField
            label="Phone Number"
            fullWidth
            sx={{ mb: 2 }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ bgcolor: "#ff3d6c", "&:hover": { bgcolor: "#e6356a" }, mt: 2 }}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
      <Toaster position="top-right" />
    </>
  );
}
//