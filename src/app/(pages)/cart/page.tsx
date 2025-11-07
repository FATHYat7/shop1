"use client";

import Loading from "@/app/loading";
import Checkout from "@/components/Checkout/Checkout";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/fromatPrice";
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data: session } = useSession();
  const { cartData, isLoading, setCartData, getCart } = useContext(CartContext);

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setClearing] = useState<boolean>(false);

  const token = session?.accessToken;

  // 🧹 Clear entire cart
  async function ClearCart() {
    if (!token) return toast.error("You must be logged in first!");

    setClearing(true);
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "DELETE",
        headers: { token },
      });

      const data: CartResponse = await response.json();

      if (data.status === "success") {
        toast.success("Cart cleared successfully");
        setCartData(null);
      } else {
        toast.error(data.message || "Failed to clear cart");
      }
    } catch (error) {
      toast.error("Something went wrong while clearing cart");
    } finally {
      setClearing(false);
    }
  }

  // ❌ Remove one product from cart
  async function removeCartItem(productId: string) {
    if (!token) return toast.error("You must be logged in first!");

    setRemovingId(productId);
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Product removed successfully");
        await getCart();
      } else {
        toast.error(data.message || "Failed to remove product");
      }
    } catch (error) {
      toast.error("Something went wrong while removing item");
    } finally {
      setRemovingId(null);
    }
  }

  // 🔼🔽 Update count for product
  async function updateCartItemCount(productId: string, count: number) {
  if (!token) return toast.error("You must be logged in first!");
  if (count === 0) return removeCartItem(productId);

  // 🧠 تحديث مباشر محلي في الواجهة
  setCartData((prev) => {
    if (!prev) return prev;
    const updatedProducts = prev.data.products.map((item) =>
      item.product._id === productId ? { ...item, count } : item
    );
    return { ...prev, data: { ...prev.data, products: updatedProducts } };
  });

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ count }),
      }
    );

    const data: CartResponse = await response.json();

    if (data.status === "success") {
      // ✅ بنكتفي بالتحديث المحلي — مش لازم getCart()
      toast.success("Cart updated");
    } else {
      toast.error(data.message || "Failed to update cart");
      await getCart(); // رجّع الداتا الحقيقية لو حصل error
    }
  } catch (error) {
    toast.error("Something went wrong while updating");
    await getCart();
  }
}


  // 🧾 Render Cart Page
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : cartData && cartData.numOfCartItems > 0 ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {cartData?.numOfCartItems || 0} items in your cart
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            {/* 🛍️ Products column */}
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                >
                  <img
                    src={item.product.imageCover || "/fallback.png"}
                    alt={item.product.title || "Product image"}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.brand?.name}. {item.product.category?.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>

                    {/* 🔼🔽 Quantity + Remove */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartItemCount(item.product._id, item.count - 1)
                          }
                          aria-label="decrease"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          -
                        </button>

                        <span className="w-6 text-center font-medium">
                          {updateId === item._id ? (
                            <Loader2 className="animate-spin size-3" />
                          ) : (
                            item.count
                          )}
                        </span>

                        <button
                          onClick={() =>
                            updateCartItemCount(item.product._id, item.count + 1)
                          }
                          aria-label="increase"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          +
                        </button>
                      </div>

                      <button
                        aria-label="remove"
                        disabled={removingId === item._id}
                        onClick={() => removeCartItem(item.product._id)}
                        className="px-3 py-1 rounded-lg border hover:bg-accent cursor-pointer flex gap-1 items-center"
                      >
                        {removingId === item._id && (
                          <Loader2 className="animate-spin size-3" />
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 💳 Summary column */}
            <div className="lg:col-span-1 sticky top-18">
              <div className="rounded-xl border p-5 shadow-sm">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal ({cartData?.numOfCartItems} items)
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(cartData?.data.totalCartPrice || 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="my-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-base font-bold">
                      {formatCurrency(cartData?.data.totalCartPrice || 0)}
                    </span>
                  </div>

                  <Checkout cartId={cartData?.cartId} />

                  <Link href={"/products"}>
                    <button className="w-full mt-5 h-11 rounded-xl border">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>

              <button
                onClick={ClearCart}
                disabled={isClearing}
                className="flex mt-2 items-center gap-2 px-3 py-1 rounded-lg border hover:bg-accent"
              >
                {isClearing && <Loader2 className="animate-spin size-3" />}
                <Trash2 className="size-4" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh] flex-col">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link href={"/products"}>
            <Button className="text-2xl mt-4">Add Products</Button>
          </Link>
        </div>
      )}
    </>
  );
}
