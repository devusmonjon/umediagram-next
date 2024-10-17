"use client";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { useEffect } from "react";
import { checkUser, refreshToken } from "@/work-with-api";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const router = useRouter();
  const auth = useAuthStore();
  // console.log(auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      checkUser().then((user) => {
        if (user.statusCode === 401 || user.statusCode === 403) {
          refreshToken().then((user) => {
            if (
              user.statusCode === 401 ||
              user.statusCode === 403 ||
              user.statusCode === 400
            ) {
              toast.error(user.message || "Authentication failed", {
                position: "top-center",
              });
              auth.logout();
              router.push("/auth/login");
            } else if (auth.accessToken) {
              auth.login(user);
            } else {
              toast.error("Something went wrong", {
                position: "top-center",
              });
              auth.logout();
              router.push("/auth/login");
            }
          });
          toast.error(user.message || "Something went wrong", {
            position: "top-center",
          });
          auth.logout();
          router.push("/auth/login");
        }
      });
    } else {
      toast.error("Please login first", {
        position: "top-center",
      });
      router.push("/auth/login");
    }
  }, [auth]);

  return (
    <>
      <Sidebar />
      <main className="ml-[30vw]">{children}</main>
    </>
  );
};

export default Layout;
