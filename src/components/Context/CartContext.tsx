"use client";
import React, { createContext } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getCart() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGFmYmY3ODAzZTg4OGUwNTYzZDc3OCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyOTY3NDE2LCJleHAiOjE3NDA3NDM0MTZ9.DF2iqgIpmEyWasg06v59Qi8TkHP6PLGNJXTROpo4CZ0";

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  return (
    <CartContext.Provider value={{ getCart }}>
      {children}
    </CartContext.Provider>
  );
}
