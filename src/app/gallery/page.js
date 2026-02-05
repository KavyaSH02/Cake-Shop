import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import GalleryContent from "./GalleryContent";

function LoadingFallback() {
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      bgcolor: "#f8f8f8" 
    }}>
      <CircularProgress sx={{ color: "#c62828" }} />
    </Box>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GalleryContent />
    </Suspense>
  );
}