"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ✅ Zod Schema مصحح
const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,20}$/,
      "Invalid password format"
    ),
});

type FormFields = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl");

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Submit Handler
async function onSubmit(values: FormFields) {
  try {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackURL ?? "/",
      redirect: false, // 👈 خليه false مؤقتًا
    });

    console.log("Response:", response);

    if (response?.error) {
      alert("❌ " + response.error);
    } else if (response?.ok) {
      // 🟢 هنا نجيب بيانات المستخدم من الـ API بتاع RouteMisr
      const loginRes = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await loginRes.json();
      console.log("User data:", data);

      if (data?.token && data?.user) {
        // ✅ خزّن التوكين و اليوزر آي دي
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userId", data.user._id);
      }

      // ✅ بعد الحفظ رجّع المستخدم للصفحة الرئيسية
      window.location.href = response.url ?? "/";
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    alert("Something went wrong during sign-in.");
  } finally {
    setIsLoading(false);
  }
}


  return (
    <Card className="w-full max-w-sm p-6 shadow-md">
      <Form {...form}>
        {searchParams.get("error") && (
          <h1 className="text-destructive text-xl text-center py-2">
            {searchParams.get("error")}
          </h1>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ali@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ahmed@123"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading && <Loader2 className="animate-spin mr-2" />} Sign In
          </Button>
          <p className="text-center text-sm text-muted-foreground">
  Forgot your password?{" "}
  <Link href="/forgot-password" className="text-primary hover:underline">
    Reset it here
  </Link>
</p>

        </form>
      </Form>
    </Card>
  );
}
