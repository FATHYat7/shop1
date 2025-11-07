import { ProductI } from '@/interfaces/product';
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
// import { StarIcon } from "lucide-react";

import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';

export default async function Products() {
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const { data: products }: { data: ProductI[] } = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map((product) => (
        <div className=" " key={product.id}>
          <Card className="p-1">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-[300px] object-cover rounded-md"
              />
              <CardHeader>
                <CardTitle>
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
                <p className="text-sm text-gray-500">{product.brand.name}</p>
              </CardHeader>
               <CardContent> <div className="flex justify-between items-center"> <div className="flex gap-1 text-yellow-500">
                 {Array.from({ length: 4 }).map((_, i) => ( <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                 className="w-5 h-5" > <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /> </svg> ))}
                  </div>
                   <p>{product.ratingsAverage}</p> 
                   </div>
                    <p className="pt-2"> Price:{" "} <span className="font-bold">{product.price} EGP</span> </p> </CardContent>
            </Link>
           <AddToCart productId={product.id}/>
           <AddToWishlist product={product} />

          </Card>
        </div>
      ))}
    </div>
  );
}
