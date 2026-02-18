import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import DollGalleryContent from "./DollGalleryContent";

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

export default function DollGalleryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DollGalleryContent />
    </Suspense>
  );
}
