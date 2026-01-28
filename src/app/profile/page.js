"use client";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FeedbackIcon from "@mui/icons-material/Feedback";



export default function ProfilePage({ isDrawer = false, onClose }) {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartCount(cartItems.length);
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        toast.error("Failed to fetch profile");
        router.push("/login");
        return;
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    toast.success("Logged out successfully");
    setTimeout(() => router.push("/login"), 600);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#d9d2bf",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      {!isDrawer && <Toaster position="top-right" />}

      <Box
        sx={{
          bgcolor: isDrawer ? "transparent" : "#fce4ec",
          minHeight: isDrawer ? "auto" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: isDrawer ? "flex-start" : "center",
          p: isDrawer ? 0 : 2,
        }}
      >
        {/* Single Card */}
        <Box
          sx={{
            bgcolor: "white",
            width: "100%",
            maxWidth: isDrawer ? "100%" : 500,
            p: 3,
            borderRadius: isDrawer ? 0 : 1,
            boxShadow: isDrawer ? "none" : "0 4px 15px rgba(226, 83, 83, 0.15)",
          }}
        >
          {/* Close Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
  <IconButton 
    sx={{ color: "black", mt: -1 }}
    onClick={isDrawer ? onClose : () => router.back()}
  >
    <CloseIcon sx={{ fontSize: 20 }} />
  </IconButton>
</Box>



          {/* Profile Section */}
          <Box sx={{ mt: 1, mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: "#ff3d6c",
                fontSize: "28px",   // <-- make letter bigger
                fontWeight: 400, 
              }}
            >
              {userData?.firstName?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography fontSize="16px" color="black">
                Hello,
              </Typography>
              <Typography fontSize="20px" fontWeight={700} color="black">
                {userData?.firstName}
              </Typography>
            </Box>
          </Box>

          {/* Edit Profile Button */}
          {/* Edit Profile Small Button */}
<Button
  variant="contained"
  onClick={() => router.push("/profile/edit")}
  sx={{
    bgcolor: "#f6f4f4",     // light pink shade
    color: "black",
    borderRadius: 1,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
    px: 0,
    py: 0,
    fontSize: "14px",
    textTransform: "none",
    ml: "10px",   // aligns under name, adjust if needed
    mt: -2.5,     // lift it closer to the avatar
    boxShadow: "none",
    "&:hover": { bgcolor: "#f8f7f7" },
  }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
  Edit
</Button>

          <Divider sx={{ my: 2, bgcolor: "#00000040" }} />

          {/* Menu Items */}
          <MenuItem icon={<HomeIcon />}  onClick={() => router.push("/dashboard")} title="Home" />
          <MenuItem icon={<ShoppingCartIcon />} title={`My Cart (${cartCount})`} />
          <MenuItem icon={<ReceiptLongIcon />} title="Order History" />
          <MenuItem icon={<LocalOfferIcon />} title="Enter Promo Code" />
          <MenuItem icon={<AccountBalanceWalletIcon />} title="Wallet" />
          <MenuItem icon={<FavoriteIcon />} title="Favorites" />
          <MenuItem icon={<LiveHelpIcon />} onClick={() => router.push("/faqs")} title="FAQs" />
          <MenuItem icon={<FeedbackIcon />} onClick={() => router.push("/feedback")} title="Feedback" />
          {/* <MenuItem icon={<SettingsIcon />} title="Setting" />  */}

          <Divider sx={{ my: 2, bgcolor: "#00000040" }} />

          <MenuItem
            icon={<ExitToAppIcon />}
            title="Logout"
            onClick={handleLogout}
            color="red"
          />
        </Box>
      </Box>
      {!isDrawer && <Toaster position="top-right" />}
    </>
  );
}

/* Menu Component */
function MenuItem({ icon, title, onClick, color }) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={{
        textTransform: "none",
        justifyContent: "flex-start",
        py: 1.5,
        gap: 2,
        color: color || "black",
        fontSize: "16px",
        "&:hover": {
          bgcolor: "#c9424210",
        },
      }}
    >
      {icon}
      {title}
    </Button>
  );
}
