
"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function Checkout({ cartId }: { cartId: string }) {
  const router = useRouter();
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);

  async function checkoutSessions() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };

    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("⚠️ Please log in first!");
      router.push("/login");
      return;
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}/allorders`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await response.json();
    console.log("✅ Checkout Response:", data);

    if (data.status === "success" && data.session?.url) {
      window.location.href = data.session.url;
    } else {
      console.error("❌ Checkout error:", data);
      alert("Failed to create checkout session. Check console for details.");
    }
  }

  function handleCashOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const address = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };

    localStorage.setItem("cashAddress", JSON.stringify(address));
    localStorage.setItem("cartId", cartId);
    router.push("/cashOrder");
  }

  return (
    <Dialog>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <Button className="w-full">Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
              Please add your shipping address
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button className="bg-blue-600" type="button" onClick={handleCashOrder}>
              Cash
            </Button>

            <Button className="bg-green-600" type="button" onClick={checkoutSessions}>
              Visa
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
