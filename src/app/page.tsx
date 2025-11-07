import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Welcome to <span className="text-black">ShopMart</span>
      </h1>

      <p className="text-gray-600 max-w-2xl mb-8 text-lg">
        Discover the latest technology, fashion, and lifestyle products. 
        Quality guaranteed with fast shipping and excellent customer service.
      </p>

      <div className="flex gap-4">
        <Link href='/products' className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-md text-lg">
          Shop Now
        </Link>

        <Link href="/categories"
          variant="outline"
          className="border border-black text-black hover:bg-gray-100 px-6 py-3 rounded-md text-lg"
        >
          Browse Categories
        </Link>
      </div>
    </section>
  );
}
