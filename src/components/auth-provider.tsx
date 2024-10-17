"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// import { checkUser } from "@/work-with-api";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const user = checkUser();
  // console.log(user);
  const router = useRouter();
  const auth = useAuthStore();
  if (auth.isAuthenticated) {
  } else {
    toast.error("Please login first", {
      position: "top-center",
    });
    router.push("/auth/login");
    return null;
  }
  return <>{children}</>;
};

export default AuthProvider;
