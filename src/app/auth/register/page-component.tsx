"use client";

import { useRouter } from "next/navigation";
import GoogleIcon from "@/components/icons";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import { registerFormSchema } from "../auth.dto";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { register, uploadFile } from "@/work-with-api";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const RegisterPageComponent = (): JSX.Element => {
  const [file, setFile] = useState<string | null>("null");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      full_name: "",
      photo: "",
      email: "",
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

  const handleSubmit = (values: z.infer<typeof registerFormSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      return;
    }
    setLoading(true);
    toast.loading("Registration in progress", {
      position: "top-center",
      id: "registering",
    });

    if (file) values.photo = file;
    else values.photo = "http://files.moontv.uz/uploads/profile_not_found.png";

    register(values)
      .then((data) => {
        try {
          if (data.error) throw new Error(data.message);

          auth.login(data);
          toast.success("Registration successful", {
            position: "top-center",
            id: "registering",
          });

          router.push("/");
          // @typescript-eslint/no-explicit-any
        } catch (error: any) {
          toast.error(error.message || "Something went wrong", {
            position: "top-center",
            id: "registering",
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          id: "registering",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-md p-8 mx-auto flex flex-col justify-center space-y-6 bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Snapgram</h1>
          <p className="mt-2 text-gray-400">Register a new account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel className="mb-[12px]" htmlFor="full_name">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="full_name"
                      className="w-full p-3 rounded bg-dark-4 text-white"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      type="text"
                      id="username"
                      className="w-full p-3 rounded bg-dark-4 text-white"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel className="mb-[12px]" htmlFor="email">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="email"
                      className="w-full p-3 rounded bg-dark-4 text-white"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Picture */}
            <FormItem className="mb-[20px]">
              <FormLabel className="mb-[12px]" htmlFor="photo">
                Profile Picture
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  id="photo"
                  className="w-full p-3 rounded bg-dark-4 text-white"
                  disabled={fileLoading || loading}
                  onChange={(e) => {
                    if (!e.target.files) return;

                    setFileLoading(true);
                    toast.promise(
                      uploadFile(e.target.files?.[0] || null, false)
                        .then((data) => {
                          try {
                            if (!data.error) {
                              toast.success("Upload Successful", {
                                position: "top-center",
                                id: "uploading",
                              });
                              setFile(data.files[0][0].url);
                            } else {
                              throw new Error(data.error);
                            }
                          } catch (error) {
                            return error;
                          }
                        })
                        .finally(() => setFileLoading(false)),
                      {
                        loading: "Uploading...",
                        success: "Upload Successful",
                        error: "Upload Failed",
                        position: "top-center",
                        id: "uploading",
                      }
                    );
                  }}
                />
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-[20px] relative">
                  <FormLabel className="mb-[12px]" htmlFor="password">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full p-3 rounded bg-dark-4 text-white"
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        variant={"ghost"}
                        type="button"
                        className="absolute right-[4px] top-[4px] text-white px-2 py-2 h-min"
                        disabled={loading}
                        onClick={() =>
                          setShowPassword((prev: boolean) => !prev)
                        }
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-[20px] relative">
                  <FormLabel className="mb-[12px]" htmlFor="passwordConfirm">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="passwordConfirm"
                        className="w-full p-3 rounded bg-dark-4 text-white"
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        variant={"ghost"}
                        type="button"
                        className="absolute right-[4px] top-[4px] text-white px-2 py-2 h-min"
                        disabled={loading}
                        onClick={() =>
                          setShowConfirmPassword((prev: boolean) => !prev)
                        }
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-indigo-600 p-3 rounded text-white font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>

        <Button className="w-full flex items-center justify-center space-x-2 bg-white text-black p-3 rounded">
          <GoogleIcon />
          <span>Sign in with Google</span>
        </Button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority={false}
          placeholder="blur"
          blurDataURL="/bg.png"
        />
      </div>
    </div>
  );
};

export default RegisterPageComponent;
