"use client";
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
    <aside className="max-w-[104px] overflow-x-hidden duration-300 whitespace-nowrap md:max-w-[300px] w-full h-screen bg-dark-2 fixed top-0">
      <div className="px-[24px] pt-[48px] pb-[32px]">
        <Link href="/">
          <Typhography
            variant="h2"
            className="text-[28x] flex items-center gap-[8px] duration-300"
          >
            <Image src="/logo.png" width={24} height={24} alt="Logo" className="min-w-max scale-150" />{" "}
            <span className="duration-300 opacity-0 md:opacity-100">
              UMEDIAGRAM
            </span>
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
                        authLocal?.user?.user.photo &&
                        authLocal?.user?.user.photo != "null"
                          ? authLocal?.user?.user.photo.includes("http")
                            ? authLocal?.user?.user.photo
                            : `http://files.moontv.uz/uploads/${authLocal?.user?.user.photo}`
                          : "http://files.moontv.uz/uploads/profile_not_found.png"
                      }
                      width={54}
                      height={54}
                      alt="avatar"
                      className="rounded-full w-[54px] h-[54px] object-cover object-center"
                    />
                    <div className="duration-300 opacity-0 md:opacity-100">
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
                      className={`navlink w-full p-[16px] flex gap-[10px] items-center rounded-[8px] transition-colors duration-300 ${
                        link.href === "/logout"
                          ? "hover:bg-red-500"
                          : "hover:bg-primary/80"
                      } relative ${
                        isActive(link.href)
                          ? link.href === "/logout"
                            ? "bg-red-500"
                            : "bg-primary"
                          : ""
                      }`}
                    >
                      <ActiveNavLink
                        className={`absolute -left-[30px] top-[-5px] nav-active duration-300 ${
                          isActive(link.href)
                            ? link.href === "/logout"
                              ? "text-red-500"
                              : "text-primary"
                            : "text-transparent"
                        }`}
                      />
                      <span
                        className={`${
                          isActive(link.href) ? "text-white" : "text-primary"
                        } aaa`}
                      >
                        {link.icon}
                      </span>
                      <span
                        className={`text-[18px] font-bold leading-[140%] -tracking-[1] text-light-2 duration-300 opacity-0 md:opacity-100`}
                      >
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
