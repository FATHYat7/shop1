import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryI } from "@/interfaces/category";
import { ProductI } from "@/interfaces/product";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  // 🟢 1. Fetch category details
  const catRes = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    cache: "no-store",
  });
  if (!catRes.ok) notFound();
  const { data: category }: { data: CategoryI } = await catRes.json();

  // 🟢 2. Fetch products of this category
  const prodRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    { cache: "no-store" }
  );
  let products: ProductI[] = [];
  if (prodRes.ok) {
    const { data } = await prodRes.json();
    products = data;
  }

  // 🧩 3. Render
  return (
    <section className="container mx-auto pt-28 pb-10 relative z-10  ">
      {/* 🏷️ Category Header */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl font-bold mb-6">{category.name}</h1>
        <div className="w-48 h-48 mx-auto">
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={300}
            className="object-contain rounded-xl w-full h-full"
          />
        </div>
      </div>

      {/* 🛍️ Category Products */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد منتجات في هذا التصنيف حالياً.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-3 hover:shadow-md transition bg-white flex flex-col items-center text-center"
            >
              <Link href={`/products/${product.id}`} className="block w-full">
                {/* ✅ خلي الارتفاع ثابت مش بـ fill علشان ما يثبتش */}
                <div className="w-full h-48 mb-3">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-contain rounded-lg w-full h-full"
                  />
                </div>
                <h3 className="font-semibold truncate">{product.title}</h3>
                <p className="text-gray-500 text-sm">{product.category?.name}</p>
                <p className="font-bold text-lg mt-1">EGP {product.price}</p>
              </Link>
              {/* 🛒 زر الإضافة إلى السلة */}
              <AddToCart productId={product.id} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
