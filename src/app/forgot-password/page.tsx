"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  email: z.string().email("Please enter a valid email"),
});

type FormFields = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormFields) {
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Reset code sent to your email!");
        // ⏳ بعد شوية نوديه لصفحة Verify Reset Code ومعاه الإيميل
        setTimeout(() => {
          router.push(`/verify-reset-code?email=${values.email}`);
        }, 1200);
      } else {
        setMessage("❌ " + (data.message || "Failed to send reset code"));
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
        Forgot Password
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="animate-spin mr-2" />}
            Send Reset Code
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
