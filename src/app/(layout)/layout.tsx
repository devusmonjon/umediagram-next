"use client";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { checkUser, refreshToken } from "@/work-with-api";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = useAuthStore();
  const pathname = usePathname();
  // console.log(auth);
  useEffect(() => {
    if (pathname.includes("/profile/")) {
      setLoading(false);
    } else {
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
          } else {
            setLoading(false);
          }
        });
      } else {
        toast.error("Please login first", {
          position: "top-center",
        });
        router.push("/auth/login");
      }
    }
  }, [auth, pathname]);

  return loading ? (
    <>Loading. . .</>
  ) : (
    <>
      <Sidebar />
      <main className="duration-300 pl-[104px] md:pl-[300px]">{children}</main>
    </>
  );
};

export default Layout;
