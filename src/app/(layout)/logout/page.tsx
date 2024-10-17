"use client";

import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { toast } from "sonner";

const Logout = () => {
  const auth = useAuthStore();
  useEffect(() => {
    auth.logout();
    toast.success("Logged out, redirecting...", {
      position: "top-center",
      id: "loggingOut",
    });
  }, []);
  return <></>;
};

export default Logout;
