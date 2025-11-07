"use client";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";

export default function AddToCart({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const { getCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    if (!session?.accessToken) {
      alert("Please log in first!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      console.log("✅ Added to cart:", data);

      // تحديث الكارت مباشرة
      await getCart();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
