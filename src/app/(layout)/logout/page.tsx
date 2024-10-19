"use client";

import { Button } from "@/components/ui/button";
import Typhography from "@/components/ui/typography";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Logout = () => {
  const auth = useAuthStore();
  // useEffect(() => {
  //   auth.logout();
  // }, []);
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    auth.logout();
    toast.success("Logged out, redirecting...", {
      position: "top-center",
      id: "loggingOut",
    });
  };
  return (
    <div className="px-[56px] py-[20px] text-start">
      <Typhography variant="h2" className="mb-[16px]">
        Are you sure?
      </Typhography>
      <div className="flex items-center gap-4 w-full justify-start">
        <Button onClick={() => router.back()} className="text-light-2">
          Back
        </Button>
        <Button onClick={handleLogout} variant={"destructive"}>
          Yes
        </Button>
      </div>
    </div>
  );
};

export default Logout;
