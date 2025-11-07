import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">

       
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="bg-black text-white px-2 py-1 rounded">T</span> ShopMart
          </h2>
          <p className="text-sm mb-4">
            Your one-stop destination for the latest technology, fashion,
            and lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> 123 Shop Street, Octoper City, DC 12345
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> (+20) 01093333333
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@shopmart.com
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold mb-3 text-black">SHOP</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories" className="hover:text-black">Electronics</Link></li>
            <li><Link href="/categories" className="hover:text-black">Fashion</Link></li>
            <li><Link href="/categories" className="hover:text-black">Home & Garden</Link></li>
            <li><Link href="/categories" className="hover:text-black">Sports</Link></li>
            <li><Link href="/categories" className="hover:text-black">Deals</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold mb-3 text-black">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-black">Contact Us</Link></li>
            <li><Link href="/" className="hover:text-black">Help Center</Link></li>
            <li><Link href="/" className="hover:text-black">Track Your Order</Link></li>
            <li><Link href="/" className="hover:text-black">Returns & Exchanges</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold mb-3 text-black">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-black">About ShopMart</Link></li>
            <li><Link href="/" className="hover:text-black">Careers</Link></li>
            <li><Link href="/" className="hover:text-black">Press</Link></li>
            <li><Link href="/" className="hover:text-black">Investor Relations</Link></li>
          </ul>
        </div>
      </div>

     
      <div className="text-center text-gray-500 text-sm mt-10 border-t pt-6">
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  );
}
