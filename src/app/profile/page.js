"use client";
import { Box, Avatar, Typography, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function ProfilePage() {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartCount(cartItems.length);
    }, []);

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
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            bgcolor: "#ff3d6c",
            fontSize: "40px",
          }}
        >
          K
        </Avatar>
        <Typography fontWeight={700} fontSize="26px">
          Kavya Hiremath
        </Typography>
        <Typography color="gray">kavya@gmail.com</Typography>

        <Button
           variant="contained"
            sx={{
             mt: 2,
             bgcolor: "#ff3d6c",
             "&:hover": { bgcolor: "#e6356a" },
            }}
           onClick={() => router.push("/profile/edit")}
        >
              Edit Profile
    </Button>

      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography fontWeight={600} sx={{ mb: 2 }}>
        Account Options
      </Typography>

      <Button fullWidth sx={{ justifyContent: "flex-start", py: 1.5 }}>
        Orders
      </Button>
      <Button fullWidth sx={{ justifyContent: "flex-start", py: 1.5 }}>
        Cart ({cartCount})
      </Button>
      <Button fullWidth sx={{ justifyContent: "flex-start", py: 1.5 }}>
        Address Book
      </Button>
      <Button fullWidth sx={{ justifyContent: "flex-start", py: 1.5 }}>
        Notifications
      </Button>

      <Divider sx={{ my: 3 }} />

       <Button
              fullWidth
              variant="outlined"
              onClick={() => router.push("/login")}
                        sx={{
                           borderColor: "#ff3d6c",
                            color: "#ff3d6c",
                             "&:hover": { borderColor: "#e6356a", color: "#e6356a" },
                     }}
                       >
                   Logout
        </Button>

            </Box>
            </Box>
  );
}
