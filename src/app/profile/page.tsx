// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useContext, useEffect } from "react";
// import { WishlistContext } from "@/components/Context/WishlistContext";
// import { CartContext } from "@/components/Context/CartContext"; // لو عندك كونتكست للكارت
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const { wishlist, getWishlist } = useContext(WishlistContext);
//   const { cart , getCart } = useContext(CartContext) || {}; // optional check

//   useEffect(() => {
//     if (status === "authenticated") {
//       getWishlist?.();
//       getCart?.();
//     }
//   }, [status]);

//   if (status === "loading")
//     return <p className="text-center py-10 text-gray-500">Loading profile...</p>;

//   if (status !== "authenticated")
//     return (
//       <div className="text-center py-20">
//         <h2 className="text-2xl font-semibold mb-4">You need to login first 🔒</h2>
//         <Link href="/login">
//           <Button>Go to Login</Button>
//         </Link>
//       </div>
//     );

//   const user = session.user;

//   return (
//     <section className="container mx-auto py-12 px-4 max-w-3xl">
//       {/* Header */}
//       <div className="bg-white shadow-md rounded-2xl p-6 text-center">
//         <img
//           src={user?.image || "/default-avatar.png"}
//           alt="User Avatar"
//           className="w-24 h-24 rounded-full mx-auto mb-4 border"
//         />
//         <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
//         <p className="text-gray-600">{user?.email}</p>

//         <div className="flex justify-center gap-4 mt-5">
//           <Button onClick={() => signOut()} variant="destructive">
//             Logout
//           </Button>
//           <Link href="/profile/edit">
//             <Button variant="outline">Edit Profile</Button>
//           </Link>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
//         <div className="bg-blue-50 rounded-xl p-5 text-center shadow-sm">
//           <h3 className="text-lg font-semibold text-blue-600">Wishlist</h3>
//           <p className="text-3xl font-bold">{wishlist?.length || 0}</p>
//           <Link href="/wishlist" className="text-blue-500 text-sm hover:underline">
//             View Wishlist
//           </Link>
//         </div>

//         <div className="bg-green-50 rounded-xl p-5 text-center shadow-sm">
//           <h3 className="text-lg font-semibold text-green-600">Cart</h3>
//           <p className="text-3xl font-bold">{cart?.numOfCartItems || 0}</p>
//           <Link href="/cart" className="text-green-500 text-sm hover:underline">
//             View Cart
//           </Link>
//         </div>

//         <div className="bg-purple-50 rounded-xl p-5 text-center shadow-sm">
//           <h3 className="text-lg font-semibold text-purple-600">Email Verified</h3>
//           <p className="text-3xl font-bold">
//             {user?.emailVerified ? "✅" : "❌"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useSession, signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/components/Context/WishlistContext";
import { CartContext } from "@/components/Context/CartContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { wishlist, getWishlist } = useContext(WishlistContext);
  const { cartData, getCart } = useContext(CartContext) || {};
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      getWishlist?.();
      getCart?.();
    }
  }, [status]);

  if (status === "loading")
    return <p className="text-center py-10 text-gray-500">Loading profile...</p>;

  if (status !== "authenticated")
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">You need to login first 🔒</h2>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );

  const user = session.user;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <section className="container mx-auto py-12 px-4 max-w-3xl">
      {/* ===== User Info ===== */}
      <div className="bg-white shadow-md rounded-2xl p-6 text-center">
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={selectedImage || user?.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border object-cover mx-auto"
          />
          <label className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-700">
            Edit
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
        <p className="text-gray-600">{user?.email}</p>

        <div className="flex justify-center gap-4 mt-5">
          <Button onClick={() => signOut()} variant="destructive">
            Logout
          </Button>
          <Link href="/profile/edit">
            <Button variant="outline">Edit Profile</Button>
          </Link>
        </div>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {/* Wishlist */}
        <div className="bg-blue-50 rounded-xl p-5 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-blue-600">Wishlist</h3>
          <p className="text-3xl font-bold">{wishlist?.length || 0}</p>
          <Link href="/wishlist" className="text-blue-500 text-sm hover:underline">
            View Wishlist
          </Link>
        </div>

        {/* Cart */}
        <div className="bg-green-50 rounded-xl p-5 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-green-600">Cart</h3>
          <p className="text-3xl font-bold">{cartData?.numOfCartItems || 0}</p>
          <Link href="/cart" className="text-green-500 text-sm hover:underline">
            View Cart
          </Link>
        </div>

        {/* Email Verified */}
        <div className="bg-purple-50 rounded-xl p-5 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-purple-600">Email Verified</h3>
          <p className="text-3xl font-bold">
            {user?.emailVerified ? "✅" : "❌"}
          </p>
        </div>

        {/* ✅ All Orders */}
        <div className="bg-yellow-50 rounded-xl p-5 text-center shadow-sm md:col-span-3">
          <h3 className="text-lg font-semibold text-yellow-600">Orders</h3>
          <p className="text-3xl font-bold">🛒</p>
          <Link href="/allorders" className="text-yellow-500 text-sm hover:underline">
            View All Orders
          </Link>
        </div>
      </div>
    </section>
  );
}
