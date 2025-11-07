"use client";

import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const WishlistContext = createContext<{
  wishlist: any[];
  getWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
}>({
  wishlist: [],
  getWishlist: async () => {},
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isLoading: false,
});

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch Wishlist
  async function getWishlist() {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      const data = await res.json();
      if (data.status === "success") {
        setWishlist(data.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Add to Wishlist (with instant UI update)
  async function addToWishlist(productId: string) {
    if (!token) return toast.error("Login first");

    // ✅ تحديث محلي فوري
    setWishlist((prev) => {
      if (prev.some((item) => item._id === productId)) return prev;
      return [...prev, { _id: productId }];
    });

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Added to wishlist ❤️");
        await getWishlist(); // ✅ نتأكد إن البيانات محدثة من السيرفر
      }
    } catch (error) {
      toast.error("Failed to add");
    }
  }

  // ✅ Remove from Wishlist (with instant UI update)
  async function removeFromWishlist(productId: string) {
    if (!token) return toast.error("Login first");

    // ✅ تحديث محلي فوري
    setWishlist((prev) => prev.filter((item) => item._id !== productId));

    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { method: "DELETE", headers: { token } }
      );
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Removed from wishlist 🗑️");
      }
    } catch (error) {
      toast.error("Failed to remove");
    }
  }

  // 🧠 أول ما المستخدم يسجّل دخول، نجيب الـwishlist
  useEffect(() => {
    if (status === "authenticated") getWishlist();
  }, [status]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, getWishlist, addToWishlist, removeFromWishlist, isLoading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
