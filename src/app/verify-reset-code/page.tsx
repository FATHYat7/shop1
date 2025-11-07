"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  resetCode: z.string().min(4, "Code must be at least 4 digits"),
});

type FormFields = z.infer<typeof formSchema>;

export default function VerifyResetCodePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(values: FormFields) {
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: values.resetCode }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ احفظ التوكن في localStorage
        if (data.token) {
          localStorage.setItem("resetToken", data.token);
        }

        setMessage("✅ Code verified successfully!");
        setTimeout(() => {
          router.push(`/reset-password?email=${email}`);
        }, 1200);
      } else {
        setMessage("❌ " + (data.message || "Invalid or expired code"));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Network error, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Verify Reset Code
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Reset Code</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="animate-spin mr-2" />}
            Verify Code
          </Button>

          {message && (
            <p
              className={`text-center text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </Form>
    </Card>
  );
}
