import React from 'react'
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import {  ShoppingCartIcon, User2Icon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
export default function navbar() {
  return <>
  
  
  <nav className=' py-3 gap-6 bg-amber-200 text-2xl font-semibold'>




<div className="container mx-auto">
  <div className="flex items-center justify-between">

<h1><Link href={'/'}>ShopMart</Link>  </h1>

      <NavigationMenu>
  <NavigationMenuList>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
 <div className='flex '>
<DropdownMenu>
  <DropdownMenuTrigger> <UserIcon/> </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
     <Link href={'/profile'}>
    <DropdownMenuItem>
     Profile
      </DropdownMenuItem>
      </Link>
     <Link href={'/login'}>
    <DropdownMenuItem>
     login
      </DropdownMenuItem>
      </Link>
       <Link href={'/register'}>
    <DropdownMenuItem>
     Register
      </DropdownMenuItem>
      </Link>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>




<div className='bg-blue-300 p-3 relative '>
<ShoppingCartIcon/>
<Badge className=" size-4 p-1 rounded-full flex justify-items-center  absolute top-0 end-0">
          <span>0</span>
        </Badge>
</div>






 </div>
  
 
  </div>
</div>



  </nav>
  
  
  

  
  
  
  
  
  
  
  
  
  
  </>
}