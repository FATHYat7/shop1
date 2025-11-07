"use client";

import { WishlistContext } from "@/components/Context/WishlistContext";
import { useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, isLoading } = useContext(WishlistContext);

  if (isLoading)
    return <p className="text-center text-lg mt-10">Loading your wishlist...</p>;

  if (!wishlist.length)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty 💔</h2>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {wishlist.map((item) => (
        <div key={item._id} className="border rounded-xl p-4">
        <img
  src={item.imageCover || item.product?.imageCover}
  alt={item.title || item.product?.title}
  className="w-full h-56 object-cover rounded-lg"
/>
<h3 className="font-semibold mt-3 line-clamp-1">
  {item.title || item.product?.title}
</h3>
<p className="text-gray-500">{item.price || item.product?.price} EGP</p>

          <button
            onClick={() => removeFromWishlist(item._id)}
            className="text-sm mt-2 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
