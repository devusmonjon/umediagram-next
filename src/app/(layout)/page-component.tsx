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

const HomePageComponent = () => {
  const [feed, setFeed] = useState<{ posts: IPost[] } | null>(null);

  useEffect(() => {
    getFeed(50)
      .then((res) => res)
      .then((data) => setFeed(data));
  }, []);

  return (
    <>
      <div className="flex my-[40px] items-center justify-between w-full">
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
            <h1 className="title">{post.caption}</h1>
            {/* <div className="overflow-y-auto flex max-w-full"> */}
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
                        className="w-full h-[520px] mb-[20px] flex-1 object-cover"
                      />
                    </SwiperSlide>
                  );
                } else if (content.type === "VIDEO") {
                  return (
                    <SwiperSlide key={content.url + Math.random()}>
                      <VideoPlayer content={content} />
                    </SwiperSlide>
                  );
                }
                return <></>;
              })}
            </Swiper>
            {/* </div> */}
          </div>
        );
      })}
    </>
  );
};

export default HomePageComponent;
