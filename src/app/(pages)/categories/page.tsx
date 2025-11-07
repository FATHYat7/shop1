"use client";


import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CategoryI } from "@/interfaces/category"; // ✅ تأكد إن الاسم مطابق في ملفك

export default function CategoriesList() {
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        setCategories(json.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading categories...</p>;
  }

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center"> Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="group p-4 border rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white flex flex-col items-center text-center"
          >
            <div className="relative w-24 h-24 mb-3">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
              {cat.name}
            </h3>
            
          </Link>

        ))}
      </div>
    </section>
  );
}
