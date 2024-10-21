"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typhography from "@/components/ui/typography";
import { getFeed, IPost } from "@/work-with-api";
import Image from "next/image";
import { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import VideoPlayer from "@/components/shared/video-player";
import Link from "next/link";
import { EditIcon } from "@/icons";
import { useAuthStore } from "@/store/auth";

// Hashtaglarni aniqlab linkka aylantirish funksiyasi
const renderCaptionWithHashtags = (caption: string) => {
  return caption.split(/(\s+)/).map((word: string, index: number) => {
    if (word.startsWith("#")) {
      return (
        <Link
          key={index}
          href={`/search?tag=${word.substring(1)}`}
          className="text-light-4 font-semibold text-[16px] hover:underline"
        >
          {word}
        </Link>
      );
    }
    return <span key={index}>{word}</span>;
  });
};

const HomePageComponent = () => {
  const [feed, setFeed] = useState<{ posts: IPost[] } | null>(null);
  const auth = useAuthStore();

  useEffect(() => {
    getFeed(50)
      .then((res) => res)
      .then((data) => setFeed(data));
  }, []);

  return (
    <>
      <div className="flex my-[40px] items-center justify-between w-full bg-dark-2">
        <Typhography variant="h2" className="font-bold">
          Home Feed
        </Typhography>
        <Select>
          <SelectTrigger className="min-w-[80px] w-min gap-[10px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="followings">Followings</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {feed?.posts?.map((post: IPost) => {
        return (
          <div
            key={post._id}
            role="article"
            tabIndex={0}
            className="w-full p-[36px_29px] border border-dark-4 rounded-[30px] mb-[40px]"
          >
            <div className="flex w-full items-start justify-between mb-[20px]">
              <Link href={`/profile/${post.owner?.username}`} className="flex gap-[10px] items-center rounded-lg">
                <img src={`${post.owner?.photo}`} alt={post.owner?.fullName} className="w-[50px] h-[50px] rounded-full object-cover object-center" />
                <div className="flex flex-col">
                  <h1 className="text-light text-[18px] font-bold leading-[140%] -tracking-[1]">{post.owner?.fullName}</h1>
                  <p className="text-light-3 text-[14px] font-semibold leading-[140%] -tracking-[1]">{new Date(post.createdAt).toDateString()}</p>
                </div>
              </Link>
              {auth.isAuthenticated && post.owner?._id === auth.user?.user._id && (
                <button title="Edit post" className="text-primary rounded-[10px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50">
                  <EditIcon />
                </button>
              )}
            </div>
            <h1 className="text-[16px] font-semibold leading-[140%] mb-[30px]">
              {renderCaptionWithHashtags(post.caption)}
            </h1>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={(e) => console.log("slide change", e)}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {post.content.map((content) => {
                if (content.type === "IMAGE") {
                  return (
                    <SwiperSlide key={content.url + Math.random()}>
                      <Image
                        src={content.url}
                        alt={content.url}
                        width={300}
                        height={520}
                        className="w-full h-[520px] mb-[20px] flex-1 object-cover rounded-[30px]"
                      />
                    </SwiperSlide>
                  );
                } else if (content.type === "VIDEO") {
                  return (
                    <SwiperSlide key={content.url + Math.random()}>
                      <VideoPlayer content={content} className="rounded-[30px] overflow-hidden" />
                    </SwiperSlide>
                  );
                }
                return <></>;
              })}
            </Swiper>
          </div>
        );
      })}
    </>
  );
};

export default HomePageComponent;
