"use client";
import { IUser } from "@/components/shared/all-users";
import { IMessages, messages } from "@/constants/messages";
import { getProfile } from "@/work-with-api";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import Loading from "./loading";
import Typhography from "@/components/ui/typography";
import { FileIcon, MicIcon, PhoneIcon, SendIcon, VideoIcon } from "@/icons";
import { Input } from "@/components/ui/input";
import { SmilePlusIcon } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
// import twemoji from "twemoji"; // Import twemoji

const ChatPageComponent = ({ username }: { username: string }) => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false)
  const fileInput = useRef<HTMLInputElement>(null);
  const [currentChatMessages, setCurrentChatMessages] = useState<IMessages[]>(
    messages[username]
  );
  const [message, setMessage] = useState<string>("")

  const [profile, setProfile] = useState<IUser | null>(null);
  useEffect(() => {
    getProfile(username).then((data) => setProfile(data as IUser));
  }, [username]);
  useEffect(() => {
    setCurrentChatMessages(
      (messages[username] as IMessages[]) || ([] as IMessages[])
    );
  }, []);

  // const parseEmoji = (message: string) => {
  //   return twemoji.parse(message, {
  //     folder: 'svg',
  //     ext: '.svg',
  //   });
  // };

  // Xabarlarni `createdAt` vaqti bo‘yicha tartiblash
  const sortedMessages = [...(currentChatMessages || [])].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setEmojiPickerVisible(false);
  };

  return profile ? (
    <div className="w-[calc(100%_-_40px] h-[calc(100vh_-_88px)] bg-dark-2 my-[44px] rounded-[20px] border border-dark-4 mr-[40px] pt-[27px] px-[30px] pb-[40px]">
      <div className="flex justify-between items-center border-b border-dark-4 w-full pb-[26.5px]">
        <Link
          href={`/profile/${username}`}
          className="flex items-center gap-[16px]"
        >
          <div className="relative">
            <Image
              src={
                profile?.photo.includes("http")
                  ? profile?.photo
                  : "https://files.moontv.uz" + profile?.photo
              }
              alt="avatar"
              width={70}
              height={70}
              className="rounded-full w-[70px] h-[70px] object-cover"
            />
            <span className="inline-block absolute z-10 w-[15px] h-[15px] rounded-full bottom-0 right-[2px] bg-[#00FF75] border-[1.5px] border-white"></span>
          </div>
          <div className="flex flex-col">
            <h1 className="leading-[140%] -tracking-[1] text-[20px] font-bold text-light">
              {profile?.fullName}
            </h1>
            <Typhography variant="p" className="text-light-3 text-[14px]">
              Online
            </Typhography>
          </div>
        </Link>
        <div className="flex items-center text-light-3 gap-[16px]">
          <button type="button" title="Audio Call">
            <PhoneIcon />
          </button>
          <button type="button" title="video Call">
            <VideoIcon />
          </button>
        </div>
      </div>
      <div className="w-full h-[calc(100%_-_166px)] overflow-y-auto pt-[56.5px] pb-[36px] bg-dark-2 border-b border-dark-4">
        {sortedMessages?.map((message, index) => (
          <div
            key={index}
            className="w-full flex items-center mb-[16px] text-light"
          >
            <div
              className={`${
                message.creator === "you"
                  ? "ml-auto bg-primary pl-[15px] pr-[20px] mr-[22.82px]"
                  : "bg-dark-4 pl-[20px] pr-[15px] ml-[22.82px]"
              } flex items-center gap-[16px] h-[55px] text-light rounded-[10px] py-[16px] relative`}
            >
              <span
                className={`inline-block absolute ${
                  message.creator === "you"
                    ? "text-primary right-[-22.82px]"
                    : "text-dark-4 left-[-22.82px]"
                } bottom-0 `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="21"
                  viewBox="0 0 48 21"
                  fill="none"
                >
                  <path
                    d="M22.7573 0.964385C23.4813 0.39787 24.4983 0.397871 25.2223 0.964386L46.2588 17.4249C47.7563 18.5966 46.9277 21 45.0263 21H2.95333C1.05196 21 0.223402 18.5966 1.72084 17.4249L22.7573 0.964385Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div className="relative">
                {/* <Image
                    src={
                      message.creator === "you"
                        ? (auth.user?.user.photo as string)
                        : profile?.photo.includes("http")
                        ? profile?.photo
                        : "https://files.moontv.uz" + profile?.photo
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  /> */}
              </div>
              <div className="flex flex-col">
                <Typhography
                  variant="p"
                  className={`${
                    message.creator === "you" ? "text-left" : "text-right"
                  } text-[14px]`}
                >
                  {message.message} {/*<span dangerouslySetInnerHTML={{ __html: parseEmoji(message.message) }}></span>*/}
                </Typhography>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          const a = e.target as HTMLFormElement;
          const formData = new FormData(e.currentTarget as HTMLFormElement);
          const message = formData.get("message") as string;
          if (message) {
            setCurrentChatMessages((prev) => [
              ...prev,
              {
                createdAt: new Date().toISOString(),
                message,
                creator: "you",
                type: "message",
              },
            ]);
            a.reset();
          }
          console.log(currentChatMessages);
        }}
        className="w-full relative flex items-center mt-[30px]"
      >
        <input
          type="file"
          accept="image/*,video/*"
          id="file"
          title="File"
          hidden
          ref={fileInput}
        />

        <button
          type="button"
          title="Choose File"
          className="absolute left-[7px] text-primary h-[calc(100%_-_15px)] w-[35px] flex items-center justify-center"
          onClick={() => fileInput.current?.click()}
        >
          <FileIcon />
        </button>
        <Input
          className="w-full min-h-[44px] bg-dark-3 px-[16px] placeholder:text-light-4 text-light-2 pl-[45px]"
          placeholder="Write your message..."
          name="message"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type="button"
          title="Select emoji"
          className="absolute right-[105px] text-primary h-[calc(100%_-_15px)] w-[35px] flex items-center justify-center"
          onClick={() => setEmojiPickerVisible(true)}
        >
          <SmilePlusIcon />
        </button>
        {/* Emoji Picker */}
       {emojiPickerVisible && (
        <div className="absolute bottom-[50px] left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
       )}
        <button
          type="button"
          title="Record voice"
          className="absolute right-[62px] text-primary h-[calc(100%_-_15px)] w-[35px] flex items-center justify-center"
        >
          <MicIcon />
        </button>
        <button
          type="submit"
          title="Send message"
          className="text-dark min-h-[48px] min-w-[48px] flex items-center justify-center bg-secondary ml-[7px] transition-[background] duration-300 hover:bg-primary hover:text-light"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

export default ChatPageComponent;
