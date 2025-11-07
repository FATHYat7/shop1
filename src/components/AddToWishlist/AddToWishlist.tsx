"use client";

import React, { useContext, useState, useEffect } from "react";
import { WishlistContext } from "@/components/Context/WishlistContext";
import { HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function AddToWishlist({ product }: { product: any }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // ✅ لو المنتج موجود بالفعل في الويش ليست
  useEffect(() => {
    const found = wishlist.some((item) => item._id === product._id);
    setIsInWishlist(found);
  }, [wishlist, product._id]);

  async function handleToggle() {
    if (isInWishlist) {
      await removeFromWishlist(product._id);
      setIsInWishlist(false);
      toast.success("Removed from wishlist 💔");
    } else {
      await addToWishlist(product._id);
      setIsInWishlist(true);
      toast.success("Added to wishlist ❤️");
    }
  }

  return (
    <Button
      onClick={handleToggle}
      variant={isInWishlist ? "secondary" : "outline"}
      className={`flex items-center gap-2 ${
        isInWishlist ? "text-red-500 border-red-400" : ""
      }`}
    >
      <HeartIcon
        size={18}
        className={`${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`}
      />
      {isInWishlist ? "Added 💖" : "Add to Wishlist"}
    </Button>
  );
}
