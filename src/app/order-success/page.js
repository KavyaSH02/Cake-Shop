"use client";

import { Suspense } from "react";
import OrderSuccessContent from "./OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading order...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
