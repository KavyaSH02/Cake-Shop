"use client";
import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRouter } from "next/navigation";
import { Send2 } from "iconsax-react";



export default function FAQsPage() {
  const [messages, setMessages] = useState([
    { text: "Hey! How can I help you today?", sender: "bot", time: "4:00 PM" }
  ]);
    const [input, setInput] = useState("");
    const router = useRouter();

  const handleSend = async () => {
  if (!input.trim()) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const userMessage = input;

  // Add user message
  setMessages((prev) => [
    ...prev,
    { text: userMessage, sender: "user", time },
  ]);

  setInput("");

  try {
    const res = await fetch("http://127.0.0.1:8000/faq/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await res.json();

    // Add bot reply
    setMessages((prev) => [
      ...prev,
      {
        text: data.reply,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        text: "Something went wrong. Please try again.",
        sender: "bot",
        time,
      },
    ]);
  }
};


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fce4ec",
        p: 2,
      }}
    >
      {/* Chat UI Box */}
      <Box
        sx={{
          width: 800,
          height: 650,
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, borderBottom: "1px solid #ddd", pb: 1 }}>
          <Avatar sx={{ width: 40, height: 40, mr: 1 }} />
          <Box>
            <Typography fontWeight={600}>Support Assistant</Typography>
            <Typography fontSize="12px" color="gray">Online</Typography>
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <IconButton onClick={() => router.push("/dashboard")}>
  <CloseIcon />
</IconButton>

          </Box>
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            bgcolor: "#f5f6fa",
            p: 2,
            borderRadius: 2,
          }}
        >
          {messages.map((msg, i) => (
            <Box key={i} sx={{ mb: 2, textAlign: msg.sender === "user" ? "right" : "left" }}>
              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: msg.sender === "user" ? "#d0e6ff" : "#e0e0e0",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </Box>
              <Typography fontSize="10px" color="gray" mt={0.5}>
                {msg.time}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
  <TextField
    fullWidth
    placeholder="Type a message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend(); // same function as send icon
      }
    }}
    sx={{
      bgcolor: "white",
      borderRadius: 50,
      "& fieldset": { borderRadius: 100 },
    }}
  />

  <IconButton
  onClick={handleSend}
  disableRipple
  sx={{
    ml: 1,
    bgcolor: "#1976d2",
    color: "white",

    "&:hover": {
      bgcolor: "#b1cbe6", // keep same color on hover
    },
    "&:active": {
      bgcolor: "#b1cbe6", // keep same color on click
    },
  }}
>
  <Send2 size="24" color="white" />
</IconButton>

</Box>

      </Box>
    </Box>
  );
}
