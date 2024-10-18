"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typhography from "@/components/ui/typography";
import {
  ActiveNavLink,
  ChatIcon,
  CreatePostIcon,
  HomeIcon,
  ImageIcon,
  LogoutIcon,
  PeopleIcon,
  ReelsIcon,
  SavedIcon,
  SettingsIcon,
} from "@/icons";
import { IAuthStore, useAuthStore } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  {
    id: "home",
    href: "/",
    icon: <HomeIcon />,
    label: "Home",
  },
  {
    id: "explore",
    href: "/explore",
    icon: <ImageIcon />,
    label: "Explore",
  },
  {
    id: "people",
    href: "/people",
    icon: <PeopleIcon />,
    label: "People",
  },
  {
    id: "saved",
    href: "/saved",
    icon: <SavedIcon />,
    label: "Saved",
  },
  {
    id: "reels",
    href: "/reels",
    icon: <ReelsIcon />,
    label: "Reels",
  },
  {
    id: "chat",
    href: "/chat",
    icon: <ChatIcon />,
    label: "Chats",
  },
  {
    id: "create",
    href: "/create",
    icon: <CreatePostIcon />,
    label: "Create Post",
  },
  {
    id: "logout",
    href: "/logout",
    icon: <LogoutIcon className="navlink-icon" />,
    label: "Logout",
  },
  {
    id: "settings",
    href: "/settings",
    icon: <SettingsIcon className="navlink-icon" />,
    label: "Setting",
  },
];

const Sidebar = () => {
  const [authLocal, setAuthLocal] = useState<IAuthStore | null>(null);

  const pathname = usePathname();
  const auth = useAuthStore();

  const isActive = (href: string) => {
    return pathname === href;
  };

  useEffect(() => {
    setAuthLocal(auth as IAuthStore);
  }, [auth]);
  return (
    <aside className="w-[350px] h-screen bg-dark-2 fixed">
      <div className="px-[24px] pt-[48px] pb-[32px]">
        <Link href="/">
          <Typhography
            variant="h2"
            className="text-[28x] flex items-center gap-[8px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.8333 15C27.8333 22.0877 22.0877 27.8333 15 27.8333C7.91234 27.8333 2.16666 22.0877 2.16666 15C2.16666 7.91234 7.91234 2.16666 15 2.16666C22.0877 2.16666 27.8333 7.91234 27.8333 15ZM30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM23.2759 8.27591C23.2759 9.1329 22.5812 9.82763 21.7242 9.82763C20.8672 9.82763 20.1725 9.1329 20.1725 8.27591C20.1725 7.41891 20.8672 6.72418 21.7242 6.72418C22.5812 6.72418 23.2759 7.41891 23.2759 8.27591ZM10.4879 16.209C11.1556 18.7009 13.717 20.1797 16.2089 19.512C18.7008 18.8443 20.1796 16.2829 19.5119 13.791C18.8442 11.2991 16.2828 9.82028 13.7909 10.488C11.299 11.1557 9.82015 13.7171 10.4879 16.209ZM8.39503 16.7698C9.37244 20.4175 13.1219 22.5823 16.7696 21.6049C20.4174 20.6274 22.5821 16.878 21.6047 13.2302C20.6273 9.58248 16.8779 7.41774 13.2301 8.39516C9.58236 9.37257 7.41762 13.122 8.39503 16.7698Z"
                fill="url(#paint0_linear_1_119)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_119"
                  x1="15"
                  y1="0"
                  x2="15"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#877EFF" />
                  <stop offset="0.461458" stopColor="#685DFF" />
                  <stop offset="1" stopColor="#3121FF" />
                </linearGradient>
              </defs>
            </svg>{" "}
            UMEDIAGRAM
          </Typhography>
        </Link>
        <ul className="mt-[32px] flex flex-col gap-[16px]">
          <li className="mb-[32px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={
                      !auth.isAuthenticated
                        ? "/auth/login"
                        : `/profile/${authLocal?.user?.user.username}`
                    }
                    className="w-full h-[56px] flex gap-[10px] items-center"
                  >
                    <Image
                      src={
                        authLocal?.user?.user.photo ??
                        "http://files.moontv.uz/uploads/profile_not_found.png"
                      }
                      width={54}
                      height={54}
                      alt="avatar"
                      className="rounded-full w-[54px] h-[54px] object-cover object-center"
                    />
                    <div>
                      <h2
                        title={authLocal?.user?.user.fullName}
                        className="text-[18px] font-bold leading-[140%] -tracking-[1] text-light-2"
                      >
                        {auth.isAuthenticated
                          ? `@${authLocal?.user?.user.fullName}`
                          : "Guest"}
                      </h2>
                      <span className="text-[14px] text-light-3 font-normal leading-[140%]">
                        {auth.isAuthenticated
                          ? `@${authLocal?.user?.user.username}`
                          : "guest"}
                      </span>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {auth.isAuthenticated
                      ? `@${authLocal?.user?.user.username}`
                      : "guest"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          {links.map((link) => (
            <li key={link.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={`navlink w-full p-[16px] flex gap-[10px] items-center rounded-[8px] transition-colors duration-300 hover:bg-primary/80 relative ${
                        isActive(link.href) ? "bg-primary" : ""
                      }`}
                    >
                      <ActiveNavLink
                        className={`absolute -left-[24px] top-[-5px] nav-active duration-300 ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-transparent"
                        }`}
                      />
                      {link.icon}
                      <span className="text-[18px] font-bold leading-[140%] -tracking-[1] text-light-2">
                        {link.label}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{link.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
