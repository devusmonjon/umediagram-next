"use client";

import { IUser } from "@/components/shared/all-users";
import Typhography from "@/components/ui/typography";
import { ChatIcon } from "@/icons";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [followings, setFollowings] = useState([]);
  const auth = useAuthStore();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/${auth.user?.user.username}`
    )
      .then((res) => res.json())
      .then((data) => setFollowings(data.following));
  }, [auth]);

  console.log(followings);

  return (
    <section id="chat" className="w-full bg-dark h-screen">
      <div className="pl-[60px] pt-[80px] w-[345px] ">
        <Typhography
          variant="h1-bold"
          className="flex items-center gap-[10px] mb-[60px] top-0 sticky bg-dark"
        >
          <ChatIcon className="w-[36px] h-[36px]" />
          All Chats
        </Typhography>
        <div className="flex flex-wrap">
          {followings?.map((following: IUser) => (
            <div className="w-full pb-[30px] border-b border-b-dark-4" key={following.username}>
              <Image
                src={
                  following.photo ? (following?.photo?.includes("http")
                    ? following.photo
                    : "https://files.moontv.uz/" + following.photo) : "https://files.moontv.uz/uploads/profile_not_found.png"
                }
                alt={following.username}
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
              <p>{following.username}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
          {followings?.map((following: IUser) => (
            <div className="w-full pb-[30px] border-b border-b-dark-4" key={following.username}>
              <p>{following.username}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
