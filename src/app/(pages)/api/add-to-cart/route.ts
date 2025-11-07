import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
// import { authOptions } from "../auth/[...nextauth]/route"


// import { authOptions } from "../../../api/auth/[...nextauth]/route"


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const { productId } = body

    if (!session?.accessToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      )
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      body: JSON.stringify({ productId }),
    })

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
