import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { CartResponse } from "@/interfaces";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${process.env.URL_API}/cart`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cart", status: response.status },
        { status: response.status }
      );
    }

    const data: CartResponse = await response.json();

    // 🧩 لو عايز تطمّن على شكل الداتا
    console.log("✅ Cart fetched from API:", JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
