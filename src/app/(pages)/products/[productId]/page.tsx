import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductSilder from '@/components/ProductSilder/ProductSilder';
import AddToCart from '@/components/AddToCart/AddToCart';


export default async function ProductDetails({ params }: { params: Params }) {
  let { productId } = params;

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  const { data: product }: { data: ProductI } = await response.json();

  return (
    <Card className="grid md:grid-cols-3 items-center">
      
      <div className="col-span-1">
         
       <ProductSilder images={product.images} altContent={product.title}/>
      </div>

     
      <div className="col-span-2 space-y-4 w-full p-4">
        <CardHeader>
          <CardDescription>{product.brand.name}</CardDescription>
          <CardTitle className="text-2xl">{product.title}</CardTitle>
          <p className="text-sm text-gray-600">{product.description}</p>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-500">{product.category.name}</p>

          <div className="flex justify-between items-center mt-3">
            <p className="flex gap-1">
              <StarIcon /> <span>{product.ratingsAverage}</span>
            </p>
            <p>Remaining: <span>{product.ratingsQuantity}</span></p>
          </div>

          <div className="flex justify-between items-center mt-3">
            <p className="flex gap-1">
              EGP <span className="text-2xl font-semibold">{product.price}</span>
            </p>
            <p>Stock: <span>{product.quantity}</span></p>
          </div>
        </CardContent>

    <AddToCart productId={product.id}/>
      </div>
    </Card>
  );
}
