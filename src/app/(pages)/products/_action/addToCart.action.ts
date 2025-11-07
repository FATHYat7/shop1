// "use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function addToCartAction(productId: string) {
  // 1️⃣ جِيب session الحالية (اللي فيها التوكن)
  const session = await getServerSession(authOptions);

  // 2️⃣ لو المستخدم مش داخل (مفيش session)
  if (!session || !session.accessToken) {
    return { error: "unauthorized" }; // هنا ممكن تتعامل في الواجهة تعمل redirect
  }

  // 3️⃣ نفّذ الطلب باستخدام التوكن
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: session.accessToken, // استخدم التوكن الحقيقي
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
