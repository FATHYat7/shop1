// 
"use client"
import React, { useContext, useEffect } from 'react'
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import { Loader2, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '../Context/CartContext'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { isLoading, cartData, getCart } = useContext(CartContext);
  const session = useSession();

  // ✅ تحديث الكارت لما المستخدم يكون authenticated
  useEffect(() => {
    if (session.status === "authenticated") {
      getCart();
    }
  }, [session.status]);

  return (
    <nav className='sticky top-0 z-50 bg-gray-300 shadow py-3'>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1><Link href={'/'}>ShopMart</Link></h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild><Link href="/products">products</Link></NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild><Link href="/categories">categories</Link></NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild><Link href="/brands">brands</Link></NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className='flex items-center'>
            {session.status == 'authenticated' && <h2 className='text-sm gap-2'>Hi {session.data?.user.name}</h2>}

            <DropdownMenu>
              <DropdownMenuTrigger><UserIcon /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.status == 'authenticated' ? (
                  <>
                    <Link href={'/profile'}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href={'/login'}>
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href={'/register'}>
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {session.status == 'authenticated' && (
              <Link href={'/cart'} className='p-3 relative'>
                <ShoppingCartIcon />
                <Badge className="size-4 p-1.5 rounded-full absolute top-0 end-0">
                  <span>{isLoading ? <Loader2 className='animate-spin' /> : cartData?.numOfCartItems}</span>
                </Badge>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
