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
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import VideoPlayer from "@/components/shared/video-player";
import Link from "next/link";
import { EditIcon, SendIcon } from "@/icons";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/input";

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
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    getFeed(50).then((data) => setFeed(data));

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video") as HTMLVideoElement;
          if (entry.isIntersecting) {
            video?.play();
          } else {
            video?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => observer.current?.disconnect();
  }, []);

  const attachObserver = (element: HTMLElement | null) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  };

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

      {feed?.posts?.map((post: IPost) => (
        <div
          key={post._id}
          role="article"
          tabIndex={0}
          className="w-full p-[36px_29px] border border-dark-4 rounded-[30px] mb-[40px] min-h-[863px]"
          ref={(el) => attachObserver(el)}
        >
          <div className="flex w-full items-start justify-between mb-[20px]">
            <Link href={`/profile/${post.owner?.username}`} className="flex gap-[10px] items-center rounded-lg">
              <img
                src={post.owner?.photo}
                alt={post.owner?.fullName}
                className="w-[50px] h-[50px] rounded-full object-cover object-center"
              />
              <div className="flex flex-col">
                <h1 className="text-light text-[18px] font-bold leading-[140%] -tracking-[1]">
                  {post.owner?.fullName}
                </h1>
                <p className="text-light-3 text-[14px] font-semibold leading-[140%] -tracking-[1]">
                  {new Date(post.createdAt).toDateString()}
                </p>
              </div>
            </Link>
            {auth.isAuthenticated && post.owner?._id === auth.user?.user._id && (
              <button title="Edit post" className="text-primary rounded-[10px]">
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
            onSlideChange={(swiper) => {
              const activeSlide = swiper.slides[swiper.activeIndex];
              const video = activeSlide.querySelector("video") as HTMLVideoElement;
              video?.play();
            }}
          >
            {post.content.map((content) => {
              if (content.type === "IMAGE") {
                return (
                  <SwiperSlide key={content.url}>
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
                  <SwiperSlide key={content.url}>
                    <VideoPlayer content={content} className="rounded-[30px] overflow-hidden" />
                  </SwiperSlide>
                );
              }
              return null;
            })}
          </Swiper>

          <div className="mt-[40px]">
            <div className="flex gap-[10px] items-center rounded-lg">
              <img
                src={post.owner?.photo}
                alt={post.owner?.fullName}
                className="w-[50px] h-[50px] rounded-full object-cover object-center"
              />
              <form onSubmit={(e) => e.preventDefault()} className="w-full relative flex items-center">
                <Input
                  className="w-full min-h-[44px] bg-dark-3 px-[16px] text-light-4 text-[16px] font-normal leading-[140%]"
                  placeholder="Write your comment..."
                />
                <button type="submit" title="Send comment" className="absolute right-[16px] text-primary">
                  <SendIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HomePageComponent;
