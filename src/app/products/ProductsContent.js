"use client";
import Image from "next/image";
import { Box, Typography, Card, Chip, IconButton, Rating, Button, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductsContent() {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState({});

  const category = searchParams.get('category');
  const router = useRouter();

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
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const newWishlist = { ...prev };
      if (prev[product.id]) {
        delete newWishlist[product.id];
      } else {
        newWishlist[product.id] = product;
      }
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
      return newWishlist;
    });
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
    { id: 401, name: "Glazed Donut", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/d.jpg", description: "Classic glazed donut", badge: "Bestseller" },
    { id: 402, name: "Chocolate Donut", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/do.jpg", description: "Rich chocolate donut delight", badge: "Highly reordered" },
    { id: 403, name: "Strawberry Donut", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/don.jpg", description: "Fresh strawberry flavored donut", badge: "Chef's Special" },
    { id: 404, name: "Sprinkle Donut", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/donu.jpg", description: "Colorful sprinkle donut", badge: "Chef's Special" },
    { id: 405, name: "Cream Filled Donut", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/dd.jpg", description: "Cream filled donut", badge: "Highly reordered" },
  ];

  const birthdayCakeProducts = [
    { id: 501, name: "Birthday Special", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/bl.jpg", description: "Special birthday cake", badge: "Bestseller" },
    { id: 502, name: "Chocolate Birthday Cake", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/blk.jpg", description: "Rich chocolate birthday cake", badge: "Highly reordered" },
    { id: 503, name: "Strawberry Birthday Cake", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/fst.jpg", description: "Fresh strawberry birthday cake", badge: "Chef's Special" },
    { id: 504, name: "Forest Birthday Cake", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/forset.jpg", description: "Forest themed birthday cake", badge: "Chef's Special" },
    { id: 505, name: "Custom Birthday Cake", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/bck.jpg", description: "Customizable birthday cake", badge: "Highly reordered" },
  ];

  const breadCakeProducts = [
    { id: 601, name: "Classic Bread Cake", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/old.jpg", description: "Classic bread cake", badge: "Bestseller" },
    { id: 602, name: "Chocolate Bread Cake", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/ol.jpg", description: "Rich chocolate bread cake", badge: "Highly reordered" },
    { id: 603, name: "Strawberry Bread Cake", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/brrr.jpg", description: "Fresh strawberry bread cake", badge: "Chef's Special" },
    { id: 604, name: "Premium Bread Cake", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/brrree.jpg", description: "Premium bread cake", badge: "Chef's Special" },
    { id: 605, name: "Special Bread Cake", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/odd.jpg", description: "Special bread cake recipe", badge: "Highly reordered" },
  ];

  const sweetsProducts = [
    { id: 701, name: "Kaju Katli", price: 150, originalPrice: 300, discount: "50% OFF", rating: 4.5, image: "/kaju.jpg", description: "Traditional kaju katli", badge: "Bestseller" },
    { id: 702, name: "Gulab Jamun", price: 180, originalPrice: 360, discount: "50% OFF", rating: 4.7, image: "/gulab.jpg", description: "Sweet gulab jamun", badge: "Highly reordered" },
    { id: 703, name: "Mixed Sweets", price: 200, originalPrice: 400, discount: "50% OFF", rating: 4.6, image: "/sw.jpg", description: "Assorted traditional sweets", badge: "Chef's Special" },
    { id: 704, name: "Motichoor Laddu", price: 220, originalPrice: 440, discount: "50% OFF", rating: 4.8, image: "/moti.jpg", description: "Traditional motichoor laddu", badge: "Chef's Special" },
    { id: 705, name: "Rasgulla", price: 170, originalPrice: 340, discount: "50% OFF", rating: 4.4, image: "/ras.jpg", description: "Soft and spongy rasgulla", badge: "Highly reordered" },
  ];

  const defaultProducts = [
    { id: 1, name: "Fresh Fruit Cake", price: 450, originalPrice: 900, discount: "50% OFF", rating: 4.5, image: "/fruit.png", description: "Fresh seasonal fruits with cream layers", badge: "Highly reordered" },
    { id: 2, name: "Mixed Fruit Delight", price: 550, originalPrice: 1100, discount: "50% OFF", rating: 4.7, image: "/fruit.png", description: "Mixed berries and tropical fruits", badge: "Bestseller" },
    { id: 3, name: "Tropical Fruit Cake", price: 600, originalPrice: 1200, discount: "50% OFF", rating: 4.8, image: "/fruit.png", description: "Exotic tropical fruits with vanilla", badge: "Highly reordered" },
    { id: 4, name: "Berry Fruit Cake", price: 500, originalPrice: 1000, discount: "50% OFF", rating: 4.6, image: "/fruit.png", description: "Fresh strawberries and blueberries", badge: "Highly reordered" },
    { id: 5, name: "Exotic Fruit Cake", price: 700, originalPrice: 1400, discount: "50% OFF", rating: 4.9, image: "/fruit.png", description: "Premium exotic fruits selection", badge: "Chef's Special" },
  ];

  const products =
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

  const handleAdd = async (id) => {
    const product = products.find(p => p.id === id);
    setQuantities(prev => ({ ...prev, [id]: 1 }));

    try {
      await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: 1 })
      });
    } catch (error) {
      console.error('API Error:', error);
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      const newCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    setAddedItem(product);
    setShowPopup(true);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrement = async (id) => {
    const newQty = (quantities[id] || 0) + 1;
    setQuantities(prev => ({ ...prev, [id]: newQty }));

    try {
      await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: newQty })
      });
    } catch (error) {
      console.error('API Error:', error);
    }

    setCart(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrement = async (id) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        fetch('http://localhost:5000/api/cart/remove', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id })
        }).catch(error => console.error('API Error:', error));

        const { [id]: _, ...rest } = prev;
        setCart(prev => {
          const newCart = prev.filter(item => item.id !== id);
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        });
        window.dispatchEvent(new Event("cartUpdated"));
        return rest;
      }

      fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: newQty })
      }).catch(error => console.error('API Error:', error));

      setCart(prev => {
        const newCart = prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      window.dispatchEvent(new Event("cartUpdated"));
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
          background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
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
      <Button
        onClick={() => router.back()}
        sx={{
          alignSelf: "flex-start",
          ml: 30,
          mb: 2,
          color: "#fff",
          fontWeight: 300,
          textTransform: "none",
          bgcolor: "rgba(239, 227, 227, 0.4)",
          backdropFilter: "blur(6px)",
          borderRadius: 1,
          px: 2,
          "&:hover": {
            bgcolor: "rgba(229, 223, 223, 0.6)",
          },
        }}
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
                onClick={() => toggleWishlist(product)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
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
                <Button onClick={() => handleAdd(product.id)} sx={{ bgcolor: "#c62828", color: "#fff", fontWeight: 700, px: 4, py: 0.5, borderRadius: 1, "&:hover": { bgcolor: "#a02020" } }}>
                  ADD
                </Button>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#c62828", borderRadius: 1, px: 1 }}>
                  <IconButton size="small" onClick={() => handleDecrement(product.id)} sx={{ color: "#fff" }}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ color: "#fff", fontWeight: 700, minWidth: 24, textAlign: "center" }}>
                    {quantities[product.id]}
                  </Typography>
                  <IconButton size="small" onClick={() => handleIncrement(product.id)} sx={{ color: "#fff" }}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      ))}

      {/* Mini centered dialog for added item */}
      <Dialog
        open={showPopup}
        onClose={() => setShowPopup(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>Added to Cart</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          {addedItem && (
            <>
              <Avatar src={addedItem.image} alt={addedItem.name} variant="rounded" sx={{ width: 80, height: 80 }} />
              <Typography sx={{ fontWeight: 700 }}>{addedItem.name}</Typography>
              <Typography color="text.secondary">₹{addedItem.price}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
          <Button onClick={() => setShowPopup(false)} sx={{ textTransform: "none" }}>Continue</Button>
          <Button onClick={handleViewCart} startIcon={<ShoppingCartIcon />} sx={{ bgcolor: "#c62828", color: "#fff", textTransform: "none", '&:hover': { bgcolor: '#a02020' } }}>View Cart</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}