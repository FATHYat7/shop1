"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CashOrderPage() {
  const [address, setAddress] = useState<any>(null);
  const [cartId, setCartId] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem("cashAddress");
    const savedCartId = localStorage.getItem("cartId");
    if (savedAddress) setAddress(JSON.parse(savedAddress));
    if (savedCartId) setCartId(savedCartId);
    setTotal(1500); // ممكن بعدين تجيب التوتال من الكارت
  }, []);

  async function handleConfirmOrder() {
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("⚠️ Missing user info. Please log in again.");
      return;
    }

    if (!cartId) {
      alert("⚠️ Missing cart info. Please go back to your cart.");
      return;
    }

    if (!address) {
      alert("⚠️ Missing address info. Please fill out your details.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            shippingAddress: address,
          }),
        }
      );

      const data = await response.json();
      console.log("Order Response:", data);

      if (data?.status === "success") {
        alert("✅ Cash order placed successfully!");
        window.location.href = "/allorders";
      } else {
        alert("❌ " + (data?.message || "Failed to place cash order"));
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong while creating order");
    } finally {
      setLoading(false);
    }
  }

  if (!address)
    return <p className="text-center mt-10 text-lg">Loading address...</p>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-2">Cash Order Summary</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow space-y-2">
        <p><strong>City:</strong> {address.city}</p>
        <p><strong>Details:</strong> {address.details}</p>
        <p><strong>Phone:</strong> {address.phone}</p>
        <p><strong>Total:</strong> {total} EGP</p>
      </div>

      <Button
        onClick={handleConfirmOrder}
        disabled={loading}
        className={`w-full mt-4 ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        } text-white`}
      >
        {loading ? "Processing..." : "Confirm Order"}
      </Button>
    </div>
  )
};