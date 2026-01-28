"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar,
  Badge,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function Home() {
  const router = useRouter();

  const categories = [
    { name: "Fruit cakes", image: "/fruit.png" },
    { name: "Biscuits", image: "/biscuit.JPG" },
    { name: "Chocolate cakes", image: "/chocolate.jpg" },
    { name: "Cup cakes", image: "/cupcake.jpg" },
    { name: "Donuts", image: "/donuts.jpeg" },
    { name: "Birthday cake", image: "/Birthday cake.jpg" },
    { name: "Bread cake", image: "/Bread Cake.jpg" },
    { name: "Sweets", image: "/Sweets.jpg" }
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#fafafa", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "#fff",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "32px",
              color: "#ff3d6c",
            }}
          >
            Sweetest!
          </Typography>
        </Box>
        <List sx={{ px: 2 }}>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }} onClick={() => router.push("/dashboard")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2, bgcolor: "#ffe5ec" }}>
              <ListItemIcon>
                <CategoryIcon sx={{ color: "#ff3d6c" }} />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Offers" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Navigation Bar */}
        <AppBar
          position="sticky"
          sx={{ bgcolor: "#fff", boxShadow: 1 }}
          elevation={0}
        >
          <Toolbar>
            <TextField
              placeholder="Search cakes or locations..."
              size="small"
              sx={{
                flexGrow: 1,
                maxWidth: 600,
                bgcolor: "#f5f5f5",
                borderRadius: "25px",
                "& fieldset": { border: "none" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#757575" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton>
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon sx={{ color: "#ff3d6c" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={5} color="error">
                <FavoriteIcon sx={{ color: "#ff3d6c" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => router.push("/profile")}>
              <PersonIcon sx={{ color: "#ff3d6c" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={index} href={`/products?category=${category.name.toLowerCase().replace(" ", "-")}`}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-48 relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-pink-500">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-70 relative rounded-lg mb-4 overflow-hidden">
                  <img
                    src="/THAR.jpg"
                    alt="Special Cake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-2">Special Cake 1</h3>
                <p className="text-gray-600 text-sm">Delicious and fresh</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-70 rounded-lg mb-4 overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    preload="auto"
                  >
                    <source src="/dolllcake.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h3 className="font-semibold mb-2">Doll Cake</h3>
                <p className="text-gray-600 text-sm">Premium quality</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="h-70 relative rounded-lg mb-4 overflow-hidden">
                  <Image
                    src="/chocolatii.jpg"

                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-gray-600 text-sm">Customer favorite</p>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  );
}