"use client";

import { Box, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const router = useRouter();

  return (
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
      <Box
        sx={{
          width: "110%",
          maxWidth: "1100px",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            FIND US
          </Typography>

          <Typography variant="h6" fontWeight="bold">
            VISIT OUR CAFE
          </Typography>

          <Typography mt={1}>
            THE DAILY GRIND <br />
            123 Coffee Street, Beanville, CA 90210 <br />
            (555) 123-667
          </Typography>

          <Typography variant="h6" fontWeight="bold" mt={3}>
            HOURS
          </Typography>

          <Typography mt={1}>
            Monday – Friday: 7 AM – 6 PM <br />
            Saturday: 8 AM – 5 PM <br />
            Sunday: 8 AM – 4 PM
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#125ea8" },
            }}
            href="https://maps.google.com/?q=The+Daily+Grind"
            target="_blank"
          >
            GET DIRECTIONS
          </Button>

          <Box mt={4}>
            <Image
              src="/cakeshop.jpg"
              alt="Cafe"
              width={360}
              height={250}
              style={{
                borderRadius: 4,
                objectFit: "cover",
              }}
            />
          </Box>

          <Typography mt={2} color="gray">
            We're right across from the Beanville Public Library!
          </Typography>
        </Box>

        {/* Right Section - Map */}
        <Box sx={{ flex: 1, p: 2, height: "100vh", position: "relative" , mr:3}}>
          {/* Close Button */}
          <IconButton
            onClick={() => router.back()}
            sx={{
              position: "absolute",
              top: 5,
              right: -18,
              width: 40,
              height: 40,
              
             
             
            }}
          >
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>

          {/* Map */}
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.205031727972!2d-122.41941568468116!3d37.7749297797597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5d731c17%3A0xe4af8f9a4427eca1!2sThe%20Daily%20Grind!5e0!3m2!1sen!2sus!4v1701234567890"
            width="100%"
            height="100%"
            style={{
              border: 0,
              borderRadius: 10,
            }}
            allowFullScreen=""
            loading="lazy"
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
