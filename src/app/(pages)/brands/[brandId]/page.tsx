import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { BrandI } from '@/interfaces/brand';
import { BrandI } from "@/interfaces/Brand";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddToCart from '@/components/AddToCart/AddToCart'



interface ProductI {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
}

export default async function BrandDetails({ params }: { params: { brandId: string } }) {
  const brandRes = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${params.brandId}`);
  const { data: brand }: { data: BrandI } = await brandRes.json();

  const productsRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${params.brandId}`);
  const { data: products }: { data: ProductI[] } = await productsRes.json();

  return (
    <div className="py-10 px-4">
      {/* تفاصيل البراند */}
      <div className="flex flex-col items-center mb-10">
        <Image
          src={brand.image}
          alt={brand.name}
          width={300}
          height={300}
          className="w-[200px] h-[200px] object-contain rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
        <p className="text-gray-500">Slug: {brand.slug}</p>
      </div>

      {/* منتجات البراند */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Products from {brand.name}</h2>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="p-2 flex flex-col justify-between">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-[250px] object-cover rounded-md"
                />
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Price: <span className="font-bold">{product.price} EGP</span>
                  </p>
                  <p className="text-yellow-500">⭐ {product.ratingsAverage}</p>
                </CardContent>
              </Link>
              <div className="px-4 pb-3">
                <AddToCart productId={product.id} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found for this brand.</p>
      )}
    </div>
  );
}
