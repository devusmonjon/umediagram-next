"use client";

import { IUser } from "@/components/shared/all-users";
import Typhography from "@/components/ui/typography";
import { ChatIcon } from "@/icons";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { usePathname } from "next/navigation";

const ChatPage = ({ children }: { children: React.ReactNode }) => {
  const [followings, setFollowings] = useState([]);
  const [followingsResponse, setFollowingsResponse] = useState<IUser[] | null>(
    []
  );
  const [loading, setLoading] = useState(true);
  const auth = useAuthStore();

  const pathname = usePathname();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/${auth.user?.user.username}`
    )
      .then((res) => res.json())
      .then((data) => setFollowings(data.following));
  }, [auth]);

  useEffect(() => {
    if (followings) {
      followings.map((following: IUser) => {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/${following.username}`
        )
          .then((res) => res.json())
          .then((data: IUser) =>
            setFollowingsResponse((prev) => [...(prev as IUser[]), data])
          )
          .finally(() => setLoading(false));
      });
    }
  }, [followings]);

  const isActive = (username: string): boolean => {
    return pathname.includes(username);
  }

  return (
    <section id="chat" className="w-full bg-dark h-screen">
      <div className="flex w-full">
        <div className="mx-[60px] pt-[80px] max-w-[370px] w-full duration-300">
          <Typhography
            variant="h1-bold"
            className="flex items-center gap-[10px] mb-[40px] top-0 sticky bg-dark"
          >
            <ChatIcon className="w-[36px] h-[36px]" />
            All Chats
          </Typhography>
          <div className="w-full h-[calc(100vh_-_170.41px)] flex flex-col justify-start items-start overflow-y-auto">
            {!loading &&
              followingsResponse?.map((following: IUser) => (
                <Link
                  href={`/chat/${following.username}`}
                  className={`flex w-full items-center justify-between py-[20px] border-b border-b-dark-4 ${isActive(following.username) ? "bg-dark-3" : "hover:bg-dark-3"} duration-300 px-[10px]`}
                  key={following.username}
                >
                  <div className="flex items-center gap-[10px]">
                    <Image
                      src={
                        following.photo
                          ? following?.photo?.includes("http")
                            ? following.photo
                            : "https://files.moontv.uz/" + following.photo
                          : "https://files.moontv.uz/uploads/profile_not_found.png"
                      }
                      alt={following.username}
                      width={70}
                      height={70}
                      className="rounded-full object-cover w-[70px] h-[70px]"
                    />
                    <div className="flex flex-col gap-[5px]">
                      <Typhography
                        variant="h1-semibold"
                        className="text-light-2 text-[22px] "
                      >
                        {following.fullName}
                      </Typhography>
                      <Typhography
                        variant="p"
                        className="text-light-3 text-[16px] "
                      >
                        @{following.username}
                      </Typhography>
                    </div>
                  </div>
                  <span className="w-[14px] h-[14px] rounded-full bg-[#00FF75]"></span>
                </Link>
              ))}
          {loading && <Loading />}
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};

export default ChatPage;
