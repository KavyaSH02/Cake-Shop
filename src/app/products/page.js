"use client";
import Image from "next/image";
import { Box, Typography, Card, Chip, IconButton, Rating, Button, TextField, InputAdornment, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import toast, { Toaster } from "react-hot-toast";


export default function ProductsPage() {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState({});
  const [apiProducts, setApiProducts] = useState([]);

  const category = searchParams.get('category');
  const router = useRouter();

  // Fetch products from backend API
  const fetchProductsFromAPI = async () => {
    try {
      const response = await fetch(`http://localhost:8000/products?category=${category}`);
      const data = await response.json();
      setApiProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setApiProducts([]);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProductsFromAPI();
    }
  }, [category]);

  // Load existing cart from localStorage on component mount and category change
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);

      // Set quantities based on existing cart for current products
      const savedQuantities = {};
      parsedCart.forEach(item => {
        savedQuantities[item.id] = item.quantity;
      });
      setQuantities(savedQuantities);
    } else {
      setCart([]);
      setQuantities({});
    }

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, [category]);

  const placeholders = [
    "Search products...",
    "Search cakes...",
    "Search birthday cakes...",
    "Search cupcakes...",
    "Search donuts...",
  ];
  const toggleWishlist = async (id) => {
    const product = products.find(p => p.id === id);
    const isInWishlist = wishlist[id];
    const userEmail = localStorage.getItem('email');
    if (!userEmail) return;

    try {
      if (isInWishlist) {

        const res = await fetch(
          `http://127.0.0.1:8000/wishlist/remove/${id}?email=${encodeURIComponent(userEmail)}`,
          { method: "DELETE" }
        );

        const data = await res.json();

        if (res.ok) {
          setWishlist(prev => {
            const newWishlist = { ...prev };
            delete newWishlist[id];
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            window.dispatchEvent(new Event("wishlistUpdated"));
            return newWishlist;
          });

          toast.success(data.message || "Removed ", { icon: "❌" });
        } else {
          toast.error(data.message || "Failed to remove item");
        }

      } else {

        const res = await fetch(
          `http://127.0.0.1:8000/wishlist/add?email=${encodeURIComponent(userEmail)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product_id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.image,
              description: product.description
            })
          }
        );

        const data = await res.json();

        if (res.ok) {
          setWishlist(prev => {
            const newWishlist = { ...prev, [id]: true };
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            window.dispatchEvent(new Event("wishlistUpdated"));
            return newWishlist;
          });

          toast.success(data.message || "Added ");
        } else {
          toast.error(data.message || "Failed to add item");
        }
      }

    } catch (error) {
      console.error("Wishlist operation failed:", error);
      toast.error("Server error");
    }
  };


  // Animate placeholder every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // start animation
      setTimeout(() => {
        setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
        setAnimate(false); // end animation
      }, 300); // duration of fade-up
    }, 2500); // total time for each placeholder

    return () => clearInterval(interval);
  }, []);

  const fruitCakeProducts = [
    { id: 1, name: "Fresh Fruit Cake", price: 450, originalPrice: 900, discount: "50% OFF", rating: 4.5, image: "/f.jpg", description: "Fresh seasonal fruits with cream layers", badge: "Highly reordered" },
    { id: 2, name: "Mixed Fruit Delight", price: 550, originalPrice: 1100, discount: "50% OFF", rating: 4.7, image: "/fr.jpg", description: "Mixed berries and tropical fruits", badge: "Bestseller" },
    { id: 3, name: "Tropical Fruit Cake", price: 600, originalPrice: 1200, discount: "50% OFF", rating: 4.8, image: "/fru.jpg", description: "Exotic tropical fruits with vanilla", badge: "Highly reordered" },
    { id: 4, name: "Berry Fruit Cake", price: 500, originalPrice: 1000, discount: "50% OFF", rating: 4.6, image: "/frui.jpg", description: "Fresh strawberries and blueberries", badge: "Highly reordered" },
    { id: 5, name: "Exotic Fruit Cake", price: 700, originalPrice: 1400, discount: "50% OFF", rating: 4.9, image: "/fruite.webp", description: "Premium exotic fruits selection", badge: "Chef's Special" },
  ];

  const biscuitCakeProducts = [
    { id: 101, name: "Chocolate Biscuit Cake", price: 350, originalPrice: 700, discount: "50% OFF", rating: 4.6, image: "/B (1).webp", description: "Crunchy biscuits layered with chocolate", badge: "Bestseller" },
    { id: 102, name: "Classic Marie Biscuit Cake", price: 300, originalPrice: 600, discount: "50% OFF", rating: 4.4, image: "/Bi.jpg", description: "Marie biscuits with rich cocoa cream", badge: "Highly reordered" },
    { id: 103, name: "Dark Chocolate Biscuit Cake", price: 420, originalPrice: 840, discount: "50% OFF", rating: 4.8, image: "/Bis.webp", description: "Dark chocolate & biscuit layers", badge: "Chef's Special" },
    { id: 104, name: "Premium Biscuit Cake", price: 420, originalPrice: 840, discount: "50% OFF", rating: 4.8, image: "/bsc.webp", description: "Premium biscuit & cream layers", badge: "Chef's Special" },
    { id: 105, name: "Special Biscuit Cake", price: 420, originalPrice: 840, discount: "50% OFF", rating: 4.8, image: "/biscu.webp", description: "Special biscuit recipe", badge: "Chef's Special" },
  ];

  const chocolateCakeProducts = [
    { id: 201, name: "Rich Chocolate Cake", price: 500, originalPrice: 1000, discount: "50% OFF", rating: 4.8, image: "/c.webp", description: "Rich dark chocolate layers", badge: "Bestseller" },
    { id: 202, name: "Chocolate Fudge Cake", price: 550, originalPrice: 1100, discount: "50% OFF", rating: 4.7, image: "/ch.jpg", description: "Decadent chocolate fudge", badge: "Chef's Special" },
    { id: 203, name: "Double Chocolate Cake", price: 600, originalPrice: 1200, discount: "50% OFF", rating: 4.9, image: "/cha.webp", description: "Double chocolate indulgence", badge: "Highly reordered" },
    { id: 204, name: "Chocolate Truffle Cake", price: 650, originalPrice: 1300, discount: "50% OFF", rating: 4.8, image: "/chac.jpg", description: "Premium chocolate truffles", badge: "Chef's Special" },
    { id: 205, name: "Classic Chocolate Cake", price: 450, originalPrice: 900, discount: "50% OFF", rating: 4.6, image: "/chaco.jpg", description: "Traditional chocolate recipe", badge: "Highly reordered" },
  ];

  const cupCakeProducts = [
    { id: 301, name: "Vanilla Cupcake", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/cr.jpg", description: "Classic vanilla cupcake with frosting", badge: "Bestseller" },
    { id: 302, name: "Chocolate Cupcake", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/cupp.webp", description: "Rich chocolate cupcake delight", badge: "Highly reordered" },
    { id: 303, name: "Strawberry Cupcake", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/cpp.jpg", description: "Fresh strawberry flavored cupcake", badge: "Chef's Special" },
    { id: 304, name: "Red Velvet Cupcake", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/cappii.jpg", description: "Classic red velvet with cream cheese", badge: "Chef's Special" },
    { id: 305, name: "Funfetti Cupcake", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/ctt.webp", description: "Colorful sprinkle cupcake", badge: "Highly reordered" },
  ];

  const donutProducts = [
    { id: 401, name: "Strawberry Donut", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/d.jpg", description: "Glazed donut with fresh strawberry topping", badge: "Bestseller" },
    { id: 402, name: "Chocolate donut", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/do.jpg", description: "Rich chocolate glazed donut", badge: "Highly reordered" },
    { id: 403, name: "Dark Donut", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/don.jpg", description: "Dark chocolate donut with cocoa glaze", badge: "Chef's Special" },
    { id: 404, name: "Mixed Donut", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/donu.jpg", description: "Assorted toppings on classic donut", badge: "Chef's Special" },
    { id: 405, name: "Walnut donut", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/dd.jpg", description: "Crunchy walnut topped donut", badge: "Highly reordered" },
  ]

  const birthdayCakeProducts = [
    { id: 501, name: "Black Forest Birthday Cake", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/bl.jpg", description: "Classic black forest with cherries", badge: "Bestseller" },
    { id: 502, name: "Chocolate Birthday Cake", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/blk.jpg", description: "Rich chocolate celebration cake", badge: "Highly reordered" },
    { id: 503, name: "Strawberry Birthday Cake", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/fst.jpg", description: "Fresh strawberry birthday delight", badge: "Chef's Special" },
    { id: 504, name: "Red Velvet Birthday Cake", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/forset.jpg", description: "Elegant red velvet celebration cake", badge: "Chef's Special" },
    { id: 505, name: "Rainbow Birthday Cake", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/bck.jpg", description: "Colorful rainbow layered cake", badge: "Highly reordered" },
  ]

  const breadCakeProducts = [
    { id: 601, name: "Classic Bread Cake", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/old.jpg", description: "Traditional bread cake with butter", badge: "Bestseller" },
    { id: 602, name: "Chocolate Bread Cake", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/ol.jpg", description: "Chocolate infused bread cake", badge: "Highly reordered" },
    { id: 603, name: "Fruit Bread Cake", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/brrr.jpg", description: "Fresh fruit topped bread cake", badge: "Chef's Special" },
    { id: 604, name: "Honey Bread Cake", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/brrree.jpg", description: "Sweet honey glazed bread cake", badge: "Chef's Special" },
    { id: 605, name: "Nutty Bread Cake", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/odd.jpg", description: "Crunchy nuts on soft bread cake", badge: "Highly reordered" },
  ]

  const sweetsProducts = [
    { id: 701, name: "Kaju Katli", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/kaju.jpg", description: "Classic vanilla cupcake with frosting", badge: "Bestseller" },
    { id: 702, name: "Gulab Jamun", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/gulab.jpg", description: "Rich chocolate cupcake delight", badge: "Highly reordered" },
    { id: 703, name: "Assorted Sweets", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/sw.jpg", description: "Fresh strawberry flavored cupcake", badge: "Chef's Special" },
    { id: 704, name: "Moti Choor Ladoo", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/moti.jpg", description: "Classic red velvet with cream cheese", badge: "Chef's Special" },
    { id: 705, name: "Rasgulla", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/ras.jpg", description: "Colorful sprinkle cupcake", badge: "Highly reordered" },
  ]

  const defaultProducts = [
    { id: 1, name: "Fresh Fruit Cake", price: 450, originalPrice: 900, discount: "50% OFF", rating: 4.5, image: "/fruit.png", description: "Premium cashew sweet delicacy", badge: "Highly reordered" },
    { id: 2, name: "Mixed Fruit Delight", price: 550, originalPrice: 1100, discount: "50% OFF", rating: 4.7, image: "/fruit.png", description: "Soft milk dumplings in sugar syrup", badge: "Bestseller" },
    { id: 3, name: "Tropical Fruit Cake", price: 600, originalPrice: 1200, discount: "50% OFF", rating: 4.8, image: "/fruit.png", description: "Mixed traditional Indian sweets", badge: "Highly reordered" },
    { id: 4, name: "Berry Fruit Cake", price: 500, originalPrice: 1000, discount: "50% OFF", rating: 4.6, image: "/fruit.png", description: "Sweet pearl-like gram flour balls", badge: "Highly reordered" },
    { id: 5, name: "Exotic Fruit Cake", price: 700, originalPrice: 1400, discount: "50% OFF", rating: 4.9, image: "/fruit.png", description: "Spongy cottage cheese balls in syrup", badge: "Chef's Special" },
  ];
  const products =
    apiProducts.length > 0 ? apiProducts :
      category === "fruit-cakes"
        ? fruitCakeProducts
        : category === "biscuits"
          ? biscuitCakeProducts
          : category === "chocolate-cakes"
            ? chocolateCakeProducts
            : category === "cup-cakes"
              ? cupCakeProducts
              : category === "donuts"
                ? donutProducts
                : category === "birthday-cake"
                  ? birthdayCakeProducts
                  : category === "bread-cake"
                    ? breadCakeProducts
                    : category === "sweets"
                      ? sweetsProducts
                      : defaultProducts;

  const addToCartAPI = async (product) => {
    try {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) {
        console.error('User not logged in');
        return null;
      }
      const response = await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(userEmail)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          description: product.description,
        }),

      });
      window.dispatchEvent(new Event("cartUpdated"));

      return await response.json();
    } catch (error) {
      console.error("Add to cart failed:", error);
      return null;
    }
  };


  const handleAdd = async (id) => {
    const product = products.find(p => p.id === id);

    const userEmail = localStorage.getItem("email");
    if (!userEmail) return;

    await fetch(`http://127.0.0.1:8000/cart/add?email=${encodeURIComponent(userEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        description: product.description
      })
    });

    setQuantities(prev => ({ ...prev, [id]: 1 }));

    setAddedItem(product);
    setShowPopup(true);
  };


  const handleIncrement = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleDecrement = (id) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        setCart(prev => {
          const newCart = prev.filter(item => item.id !== id);
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        });
        return rest;
      }
      setCart(prev => {
        const newCart = prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      return { ...prev, [id]: newQty };
    });
  };



  const handleViewCart = () => {
    router.push('/cart');
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryBackgrounds = {
    "fruit-cakes": "/fr.jpg",
    "biscuits": "/Bi.jpg",
    "chocolate-cakes": "/c.webp",
    "cup-cakes": "/cupp.webp",
    "donuts": "/don.jpg",
    "birthday-cake": "/bck.jpg",
    "bread-cake": "/old.jpg",
    "sweets": "/kaju.jpg",
  };

  const bgImage = categoryBackgrounds[category] || "/fruit.png";

  const categoryBackLabels = {
    "fruit-cakes": "Fruit Cakes",
    "biscuits": "Biscuit Cakes",
    "chocolate-cakes": "Chocolate Cakes",
    "cup-cakes": "Cup Cakes",
    "donuts": "Donuts",
    "birthday-cake": "Birthday Cakes",
    "bread-cake": "Bread Cakes",
    "sweets": "Sweets",
  };

  const backLabel = categoryBackLabels[category] || "Products";



  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        position: "relative",

        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 0,
        },

        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      <Toaster position="top-right" suppressHydrationWarning />
      <Button
        onClick={() => router.back()}
        sx={{
          alignSelf: "flex-start",
          ml: 40,
          mb: 1,
          color: "#fff",
          fontWeight: 300,
          mb: 2,
          textTransform: "none",
          bgcolor: "rgba(239, 227, 227, 0.4)",
          backdropFilter: "blur(6px)",
          borderRadius: 1,
          px: 2,
          "&:hover": {
            bgcolor: "rgba(229, 223, 223, 0.6)",
          },
        }}
        suppressHydrationWarning
      >
        {backLabel}
      </Button>



      {/* Animated Search Bar */}
      <Box sx={{ position: "relative", width: { xs: "95%", sm: 600, md: 900 }, mb: 1, mt: -2 }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": { borderRadius: "10px" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            placeholder: "",
          }}
          suppressHydrationWarning
        />

        {/* Animated Placeholder */}
        {!searchQuery && (
          <Typography
            sx={{
              position: "absolute",
              left: 40,
              top: "50%",
              transform: animate ? "translateY(-150%)" : "translateY(-50%)",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              opacity: animate ? 0 : 1,
              pointerEvents: "none",
              color: "#9e9e9e",
            }}
          >
            {placeholders[placeholderIndex]}
          </Typography>
        )}
      </Box>

      {/* Product Cards */}
      {filteredProducts.map((product) => (
        <Card
          key={product.id}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            width: { xs: "95%", sm: 600, md: 900 },
            px: 2,
            "&:hover": { boxShadow: 4 },
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ width: "65%", flexGrow: 1, pr: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{product.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box sx={{ width: 40, height: 4, bgcolor: "#4caf50", borderRadius: 1 }} />
              <Typography variant="body2" color="text.secondary">{product.badge}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>₹{product.price}</Typography>
              <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>₹{product.originalPrice}</Typography>
            </Box>
            <Chip label={product.discount} size="small" sx={{ bgcolor: "#4caf50", color: "#fff", fontWeight: 600, mb: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{product.description}</Typography>
            <Chip label={product.badge} size="small" sx={{ bgcolor: "#4caf50", color: "#fff", fontWeight: 600, mb: 1 }} />
            <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ mb: 1 }} />
          </Box>
          <Box sx={{ width: 240, p: 1, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* ❤️ Like Button */}
              <IconButton
                onClick={() => toggleWishlist(product.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
                suppressHydrationWarning
              >
                {wishlist[product.id] ? (
                  <FavoriteIcon sx={{ color: "#e53935" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#e53935" }} />
                )}
              </IconButton>

              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </Box>


            <Box sx={{ mt: 1 }}>
              {!quantities[product.id] ? (
                <Button onClick={() => handleAdd(product.id)} sx={{ bgcolor: "#c62828", color: "#fff", fontWeight: 700, px: 4, py: 0.5, borderRadius: 1, "&:hover": { bgcolor: "#a02020" } }} suppressHydrationWarning>
                  ADD
                </Button>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#c62828", borderRadius: 1, px: 1 }}>
                  <IconButton size="small" onClick={() => handleDecrement(product.id)} sx={{ color: "#fff" }} suppressHydrationWarning>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ color: "#fff", fontWeight: 700, minWidth: 24, textAlign: "center" }}>
                    {quantities[product.id]}
                  </Typography>
                  <IconButton size="small" onClick={() => handleIncrement(product.id)} sx={{ color: "#fff" }} suppressHydrationWarning>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      ))}

      {/* Popup Notification */}
      <Snackbar
        open={showPopup}
        autoHideDuration={3000}
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowPopup(false)}
          severity="success"
          sx={{
            width: "100%",
            minHeight: "36px",          // ✅ controls popup height
            // py: -1,                    // ✅ vertical padding
            // px: 1,  

            alignItems: "center",
            bgcolor: "#D32F2F",       // 🔴 RED background
            color: "#fff",            // ⚪ white text
            "& .MuiAlert-icon": {
              color: "#fff",          // ⚪ white success icon
            },
          }}
          action={
            <Button
              onClick={handleViewCart}
              startIcon={
                <ShoppingCartIcon sx={{ color: "#fff" }} /> // 🛒 white icon
              }
              sx={{
                color: "#fff",
                fontWeight: "300",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              View Item
            </Button>
          }
        >
          {addedItem && `${addedItem.name} added to cart!`}
        </Alert>
      </Snackbar>
    </Box>
  );
}