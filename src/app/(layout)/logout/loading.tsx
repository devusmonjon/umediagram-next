"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const Loading = () => {
  useEffect(() => {
    toast.loading("Logging out", {
      position: "top-center",
      id: "loggingOut",
    });
  }, []);
  return <></>;
};

export default Loading;
