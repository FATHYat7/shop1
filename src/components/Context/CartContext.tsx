"use client";

import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => Promise<void>;
  UserId: string | null;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: async () => {},
  UserId: null,
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [UserId, setUserId] = useState<string | null>(null);

  async function getCart() {
    if (status !== "authenticated" || !session?.accessToken) return;

    try {
      setIsLoading(true);
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: session.accessToken,
        },
        cache: "no-store",
      });

      if (!response.ok) return;

      const data: CartResponse = await response.json();
      if (data?.data?.products) {
        setCartData(data);
        setUserId(data.data.cartOwner);
        localStorage.setItem("userId", data.data.cartOwner);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ نجيب الكارت أول ما المستخدم يتسجل دخول أو يتغير السيشن
  useEffect(() => {
    if (status === "authenticated") {
      getCart();
    }
  }, [status, session]);

  // ✅ نعمل refresh للكارت كل مرة المستخدم يزور صفحة جديدة (زي /profile)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && status === "authenticated") {
        getCart();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [status]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        isLoading,
        setIsLoading,
        getCart,
        UserId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
