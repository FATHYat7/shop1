import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface BrandI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default async function Brands() {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const { data: brands }: { data: BrandI[] } = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 p-4">
      {brands.map((brand) => (
        <Link key={brand._id} href={`/brands/${brand._id}`}>
          <Card className="p-3 text-center hover:shadow-md transition">
            <Image
              src={brand.image}
              alt={brand.name}
              width={300}
              height={300}
              className="w-full h-[250px] object-contain rounded-md bg-white"
            />
            <CardHeader>
              <CardTitle>{brand.name}
                 

              </CardTitle>
            </CardHeader>
            {/* <AddToWishlist product={brand} /> */}

          </Card>
        </Link>
      ))}
    </div>
  );
}
