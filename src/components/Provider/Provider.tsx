// "use client"

// import { SessionProvider } from 'next-auth/react'
// import React, { Children, ReactNode } from 'react'
// import CartContextProvider from '../Context/CartContext'
// import { Toaster } from 'react-hot-toast'
// import Navbar from "@/components/Navbar/Navbar";
// export default function Provider({children}: {children:ReactNode}) {
//   return (
//      <SessionProvider>
//   <CartContextProvider>
//       <Navbar/>  
//         <main className="container mx-auto py-4">

//       <Toaster/>
// {children}
//         </main>
//         </CartContextProvider>
//     </SessionProvider>
//   )
// }
"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import CartContextProvider from "../Context/CartContext";
import WishlistContextProvider from "../Context/WishlistContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <Navbar />
          <main className="container mx-auto py-4">
            <Toaster />
            {children}
          </main>
        </WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
