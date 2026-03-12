"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Rating,
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("email") || "";
      const token = localStorage.getItem("token");
      
      if (!email || !token) return;
      
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/profile?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setFormData({ name: data.firstName, email });
        } else {
          setFormData({ name: "", email });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setFormData({ name: "", email });
      }
    };
    
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = e.target.message.value.trim();
    const newErrors = {};
    
    if (!message) newErrors.message = "Message is required";
    if (message && message.length < 10) newErrors.message = "Message must be at least 10 characters";
    if (message && message.length > 500) newErrors.message = "Message cannot exceed 500 characters";
    
    if (rating === 0) newErrors.rating = "Please give a rating";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const feedbackData = {
      name: formData.name,
      email: formData.email,
      rating,
      emoji:
        rating === 1 ? "😖" :
        rating === 2 ? "☹️" :
        rating === 3 ? "🙂" :
        rating === 4 ? "😄" :
        rating === 5 ? "🤩" : "",
      message,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Success!");
      } else {
        toast.error(data.detail || "Something went wrong ❌");
      }
    } catch (error) {
      toast.error("Server error. Try again ❌");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {open && (
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "#fce4ec",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: "500px",

              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => router.push("/dashboard")}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "#666",
              }}
            >
              <CloseIcon />
            </IconButton>

            <CardContent sx={{ p: 4 }}>
              <Box textAlign="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#ff3d6c">
                  🍰 Feedback
                </Typography>
                <Typography color="text.secondary" mt={1}>
                  We'd love to hear from you!
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  sx={{ mb: 2,  "& .MuiInputBase-input": { color: "#999" } }}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  sx={{ 
                    mb: 2,
                    "& .MuiInputBase-input": { color: "#999" }
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  fullWidth
                  name="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={3}
                  onChange={() => setErrors(prev => ({ ...prev, message: '' }))}
                  sx={{ mb: 3 }}
                  error={!!errors.message}
                  helperText={errors.message}
                />

                <Box textAlign="center" sx={{ mb: 3 }}>
                  <Typography fontWeight="bold" mb={1}>
                    Rate your experience
                  </Typography>

                  <Rating
                    value={rating}
                    onChange={(e, newValue) => {
                      setRating(newValue);
                      setErrors(prev => ({ ...prev, rating: '' }));
                    }}
                    size="large"
                    sx={{
                      "& .MuiRating-icon": { fontSize: "2rem" },
                      "& .MuiRating-iconFilled": { color: "#ff3d6c" },
                    }}
                  />

                  {rating > 0 && (
                    <Typography mt={1} fontSize="14px" color="#666">
                      {rating === 1 && "😖 Needs Work"}
                      {rating === 2 && "☹️ Could Be Better"}
                      {rating === 3 && "🙂 Good"}
                      {rating === 4 && "😄 Great"}
                      {rating === 5 && "🤩 Amazing!"}
                    </Typography>
                  )}
                  {errors.rating && (
                    <Typography color="error" fontSize="14px" mt={1}>
                      {errors.rating}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#ff3d6c",
                      borderRadius: "6px",
                      fontWeight: "600",
                      fontSize: "14px",
                      py: 0.8,
                      px: 2,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#e6356a" },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
