// src/app/auth/signin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import GoogleIcon from "@/components/icons";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { NextPage } from "next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "../auth.dto";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { login } from "../../../work-with-api";
import { IAuthUser, useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

const LoginPageComponent: NextPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const auth = useAuthStore();
  useEffect(() => {
    if (auth.isAuthenticated) {
      toast.error("You are already logged in", {
        position: "top-center",
        action: {
          label: <X />,
          onClick: () => console.log("Undo"),
        },
        actionButtonStyle: {
          backgroundColor: "transparent",
          color: "white",
        },
      });
      router.push("/");
    }
  }, []);
  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setLoading(true);
    const loading = toast.loading("Authenticating...", {
      position: "top-center",
    });
    const result = await login(values.username, values.password);
    console.log(result);

    if (result?.error || !result) {
      // Handle error (e.g., show a message)
      toast.error(result.message, {
        position: "top-center",
        id: loading,
      });
      setLoading(false);
    } else {
      try {
        auth.login(result as IAuthUser);
        setLoading(false);
        toast.success("Login Successful", {
          position: "top-center",
          id: loading,
        });
        router.push("/");
      } catch (e) {
        // Handle error (e.g., show a message)
        console.error(e);
        toast.error("Something went wrong", {
          position: "top-center",
          id: loading,
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Chap panel: Login form */}
      <div className="w-full max-w-md p-8 mx-auto flex flex-col justify-center space-y-6 bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Snapgram</h1>
          <p className="mt-2 text-gray-400">Log in to your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel className="mb-[12px]" htmlFor="username">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      id="username"
                      className="w-full p-3 rounded bg-dark-4 text-white focus:outline-none focus:ring-2 border-none lowercase"
                      {...field}
                      autoComplete="off"
                      autoFocus
                      disabled={loading}
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
                <FormItem className="mb-[20px]">
                  <FormLabel className="mb-[12px]" htmlFor="password">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      className="w-full p-3 rounded bg-dark-4 text-white focus:outline-none focus:ring-2 border-none"
                      {...field}
                      autoComplete="off"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-indigo-600 p-3 rounded text-white font-medium duration-300 mt-[10px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <Button className="w-full flex items-center justify-center space-x-2 bg-white text-black p-3 rounded">
          <GoogleIcon />
          <span>Sign in with Google</span>
        </Button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* O'ng panel: Image bilan */}
      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority={false} // Lazy loading uchun
          placeholder="blur"
          blurDataURL="/bg.png"
        />
      </div>
    </div>
  );
};

export default LoginPageComponent;
