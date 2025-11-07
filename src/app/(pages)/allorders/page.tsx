"use client";

import { useEffect, useState } from "react";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 async function getAllOrders() {
  try {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.warn("⚠️ Missing user info. Please log in again.");
      setLoading(false);
      return;
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: { token },
      }
    );

    const data = await res.json();
    console.log("🟢 Orders Response:", data);

    if (Array.isArray(data)) {
      setOrders(data);
    } else {
      console.error("❌ Unexpected data format from API:", data);
    }
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) return <p className="text-center py-10">Loading orders...</p>;

  return (
    <section className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🧾 All Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="border rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg mb-2">Order ID: {order._id}</h2>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Total Price: <strong>{order.totalOrderPrice} EGP</strong></p>
              <p>Payment Method: {order.paymentMethodType}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
