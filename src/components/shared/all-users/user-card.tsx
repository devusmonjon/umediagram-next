"use client";

import Image from "next/image";
import { IUser } from ".";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const UserCard = ({ user }: { user: IUser }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const auth = useAuthStore();

  const follow = () => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/follow/${user.username}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setIsFollowed(true);
        }
      })
      .catch((err) => {
        setIsFollowed(false);
        console.log(err);
        toast.error("Something went wrong", { position: "top-center" });
      })
      .finally(() => setLoading(false));
  };

  const unfollow = () => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/unfollow/${user.username}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setIsFollowed(false);
        }
      })
      .catch((err) => {
        setIsFollowed(true);
        toast.error("Something went wrong", { position: "top-center" });
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setIsFollowed(
      user.followers.some(
        (item: { _id: string }) => item._id === auth.user?.user?._id
      )
    );
  }, [user]);

  return (
    <div
      className="w-[190px] h-[190px] rounded-[20px] border border-dark-4 bg-dark-2 py-[24px] px-[35px] flex flex-col items-center"
      tabIndex={0}
    >
      <Link
        href={`/profile/${user.username}`}
        className="w-full flex justify-center pb-[10px]"
      >
        <Image
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://files.moontv.uz/uploads/profile_not_found.png";
          }}
          src={
            user?.photo
              ? (user?.photo?.includes("http") ||
                user?.photo?.includes("data:image")
                ? user.photo
                : "https://files.moontv.uz/" + user.photo)
              : "https://files.moontv.uz/uploads/profile_not_found.png"
          }
          alt=""
          width={54}
          height={54}
          className="w-[54px] h-[54px] rounded-full"
        />
      </Link>
      <Link
        href={`/profile/${user.username}`}
        className="pb-[2px] text-[14px] font-semibold leading-[140%] -tracking-[1px] text-light whitespace-nowrap"
      >
        {user.fullName}
      </Link>
      <p className="text-[10px] font-semibold leading-[140%] text-light-3 whitespace-nowrap pb-[18px]">
        Followed by devusmonjon
      </p>

      <Button
        className={`px-[18px] duration-300 py-[6px] text-[12px] font-semibold leading-[18px] h-min w-min text-light flex items-center justify-center`}
        variant={isFollowed ? "destructive" : "default"}
        onClick={isFollowed ? unfollow : follow}
        disabled={loading}
      >
        {!loading ? (
          !isFollowed ? (
            "Follow"
          ) : (
            "Unfollow"
          )
        ) : (
          <Loader2 className="w-[16px] h-[16px] animate-spin" />
        )}
      </Button>
    </div>
  );
};

export default UserCard;
