"use client";

import Typhography from "@/components/ui/typography";
import UserCard from "./user-card";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  photo: string;
  fullName: string;
  emailActivated: boolean;
  role: string;
  followers: IFollower[];
  following: IFollower[];
  posts: [];
  reels: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
}

export interface IFollower {
  username: string;
  _id: string;
}

const AllUsers = () => {
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.length ? data : [])).finally(() => setLoadMoreLoading(false));
  }, [limit]);

  return (
    <div className="duration-300 fixed top-0 right-0 bg-dark-2 h-screen w-[465px] px-[24px] overflow-y-auto -z-10 opacity-0 xl:opacity-100 xl:z-0 translate-x-[100%] xl:translate-x-0">
      <Typhography
        variant="h3"
        className="whitespace-nowrap mb-[40px] font-bold sticky top-0 backdrop-blur-xl pt-[48px]"
      >
        Top creators
      </Typhography>
      <div className="flex flex-wrap gap-[24px]">
        {users?.map((user: IUser) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      <div className="w-full text-center py-4">
        <Button className="text-light px-[16px] py-[6px] h-min w-min text-[14px]" onClick={() => {
          setLimit((prev) => prev + 8);
          setLoadMoreLoading(true);
        }} disabled={loadMoreLoading}>
          Load more
          {loadMoreLoading && (
            <Loader2 className="animate-spin h-4 w-4 text-light ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default AllUsers;
