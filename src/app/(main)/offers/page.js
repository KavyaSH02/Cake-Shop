"use client";
import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    Skeleton,
    Divider,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const coupons = [
    {
        code: "CAKE20",
        title: "20% OFF on Cakes",
        desc: "Min order ₹399 • Max discount ₹150",
        expiry: "Valid till 28 Feb",
    },
    {
        code: "FIRST50",
        title: "₹50 OFF for New Users",
        desc: "Min order ₹299",
        expiry: "Limited time offer",
    },
    {
        code: "FREESHIP",
        title: "Free Delivery",
        desc: "On orders above ₹499",
        expiry: "Today only",
    },
];

export default function OffersPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    return (
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", p: { xs: 2, md: 4 } }}>
            {/* HERO BANNER */}
            <Box
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 3,
                    background:
                        "linear-gradient(135deg, #ff3d6c 0%, #ff8fab 100%)",
                    color: "#fff",
                }}
            >
                <Typography variant="h4" fontWeight={700}>
                    Offers for You 🎉
                </Typography>
                <Typography sx={{ mt: 1, opacity: 0.9 }}>
                    Grab the best deals on your favourite cakes
                </Typography>
            </Box>

            {/* COUPONS */}
            <Typography variant="h6" fontWeight={700} mb={2}>
                Available Coupons
            </Typography>

            <Grid container spacing={3}>
                {(loading ? Array.from(new Array(3)) : coupons).map((item, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        {loading ? (
                            <Skeleton variant="rounded" height={160} />
                        ) : (
                            <Card
                                sx={{
                                    height: "100%",
                                    borderRadius: 3,
                                    border: "1px dashed #ff3d6c",
                                }}
                            >
                                <CardContent>
                                    <Chip
                                        icon={<LocalOfferIcon />}
                                        label={item.code}
                                        sx={{
                                            mb: 1.5,
                                            bgcolor: "#ffe5ec",
                                            color: "#ff3d6c",
                                            fontWeight: 700,
                                        }}
                                    />

                                    <Typography fontWeight={700} noWrap={false}>
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#666",
                                            fontSize: 14,
                                            mt: 0.5,
                                        }}
                                    >
                                        {item.desc}
                                    </Typography>

                                    <Divider sx={{ my: 1.5 }} />

                                    <Typography sx={{ fontSize: 13, color: "#999" }}>
                                        {item.expiry}
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            bgcolor: "#ff3d6c",
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            "&:hover": { bgcolor: "#e7335f" },
                                        }}
                                    >
                                        APPLY OFFER
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                ))}
            </Grid>

            {/* CATEGORY OFFERS */}
            <Typography variant="h6" fontWeight={700} mt={6} mb={2}>
                Category Offers
            </Typography>

            <Grid container spacing={2}>
                {["Birthday Cakes", "Cupcakes", "Chocolate Cakes"].map((cat) => (
                    <Grid item xs={12} md={4} key={cat}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography fontWeight={700}>{cat}</Typography>
                                <Typography sx={{ color: "#666", mt: 0.5 }}>
                                    Flat 15% OFF
                                </Typography>
                                <Button
                                    size="small"
                                    sx={{ mt: 1, color: "#ff3d6c", fontWeight: 600 }}
                                >
                                    View Items
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* BANK OFFERS */}
            <Typography variant="h6" fontWeight={700} mt={6} mb={2}>
                Bank & Payment Offers
            </Typography>

            <Grid container spacing={2}>
                {["HDFC Bank Cards", "UPI Payments", "Paytm Wallet"].map((bank) => (
                    <Grid item xs={12} md={4} key={bank}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ display: "flex", gap: 2 }}>
                                <CreditCardIcon sx={{ color: "#ff3d6c" }} />
                                <Box>
                                    <Typography fontWeight={700}>{bank}</Typography>
                                    <Typography sx={{ fontSize: 14, color: "#666" }}>
                                        Extra cashback available
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
