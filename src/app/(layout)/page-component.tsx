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
import VideoPlayer from "@/components/shared/video-player";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { EditIcon, SendIcon } from "@/icons";
import { useAuthStore } from "@/store/auth";
import { Input } from "@/components/ui/input";
import "swiper/css";

const HomePageComponent = () => {
  const [feed, setFeed] = useState<{ posts: IPost[] } | null>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const auth = useAuthStore();

  useEffect(() => {
    getFeed(50)
      .then((res) => res)
      .then((data) => setFeed(data));
  }, []);

  // Scroll orqali postlarni boshqarish
  const handleScroll = () => {
    postRefs.current.forEach((post, index) => {
      if (!post) return;

      const rect = post.getBoundingClientRect();
      const video = post.querySelector("video");

      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setActiveIndex(index); // Faol postni aniqlash
        video?.play();
      } else {
        video?.pause(); // Ko‘rinmayotgan video pauza qilinadi
      }
    });
  };

  // `j` va `k` orqali postlar o‘rtasida harakatlanish
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "j" && activeIndex < (feed?.posts.length || 0) - 1) {
      postRefs.current[activeIndex + 1]?.scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "k" && activeIndex > 0) {
      postRefs.current[activeIndex - 1]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, feed]);

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

      {feed?.posts?.map((post, index) => (
  <div
    key={post._id}
    // @typescript-eslint/ban-ts-comment
    // @ts-expect-error @typescript-eslint/ban-ts-comment 
    ref={(el) => (postRefs.current[index] = el)}
    role="article"
    tabIndex={0}
    className="w-full p-[36px_29px] border border-dark-4 rounded-[30px] mb-[40px] min-h-[863px]"
  >
          <div className="flex w-full items-start justify-between mb-[20px]">
            <Link href={`/profile/${post.owner?.username}`} className="flex gap-[10px] items-center rounded-lg">
              <img
                src={`${post.owner?.photo}`}
                alt={post.owner?.fullName}
                className="w-[50px] h-[50px] rounded-full object-cover object-center"
              />
              <div className="flex flex-col">
                <h1 className="text-light text-[18px] font-bold leading-[140%]">
                  {post.owner?.fullName}
                </h1>
                <p className="text-light-3 text-[14px] font-semibold leading-[140%]">
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
            {post.caption.split(/(\s+)/).map((word, i) =>
              word.startsWith("#") ? (
                <Link
                  key={i}
                  href={`/search?tag=${word.substring(1)}`}
                  className="text-light-4 font-semibold hover:underline"
                >
                  {word}
                </Link>
              ) : (
                <span key={i}>{word}</span>
              )
            )}
          </h1>

          <Swiper spaceBetween={10} slidesPerView={1}>
      {post.content.map((content) => (
        <SwiperSlide key={content.url}>
          {content.type === "IMAGE" ? (
            <Image
              src={content.url}
              alt={content.url}
              width={300}
              height={520}
              className="w-full h-[520px] mb-[20px] object-cover rounded-[30px]"
            />
          ) : (
            <VideoPlayer 
              content={content} 
              className="rounded-[30px] overflow-hidden" 
              isActive={activeIndex === index} // Faol holatni aniqlash
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper> 

          <div className="mt-[40px]">
            <div className="flex gap-[10px] items-center rounded-lg">
              <img
                src={`${post.owner?.photo}`}
                alt={post.owner?.fullName}
                className="w-[50px] h-[50px] rounded-full object-cover object-center"
              />
              <form onSubmit={(e) => e.preventDefault()} className="w-full relative flex items-center">
                <Input
                  className="w-full min-h-[44px] bg-dark-3 px-[16px] text-light-4"
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
