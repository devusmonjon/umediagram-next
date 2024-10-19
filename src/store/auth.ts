"use client";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface ILoginUser {
  _id?: string;
  username?: string;
  fullName?: string;
  photo?: string;
}
export interface IAuthUser {
  user: ILoginUser;
  accessToken: string;
  refreshToken: string;
}
export interface IAuthStore {
  user: IAuthUser | null;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  logout: () => void;
  login: (user: IAuthUser) => void;
}

let user: IAuthUser | null = null,
  accessToken = "",
  refreshToken = "";
try {
  accessToken = Cookies.get("accessToken") || "";
  refreshToken = Cookies.get("refreshToken") || "";
  user = JSON.parse(localStorage.getItem("user") || "null");
} catch (e) {
  console.error(e);
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: user,
  accessToken: accessToken,
  refreshToken: refreshToken,
  isAuthenticated: accessToken ? true : false,
  logout: () => {
    try {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("user");
      set({
        accessToken: "",
        user: null,
        refreshToken: "",
        isAuthenticated: false,
      });
    } catch (e) {
      console.error(e);
    }
  },
  login: (user) => {
    try {
      Cookies.set("accessToken", user.accessToken, {
        expires: 14, // 7 kun amal qiladi
        path: "/", // Barcha route-larda foydalanish uchun
        secure: true, // HTTPS orqali jo‘natiladi
        sameSite: "strict", // CSRF hujumlaridan himoya
      });

      Cookies.set("refreshToken", user.refreshToken, { expires: 30 });
      localStorage.setItem("user", JSON.stringify(user));
      set({
        accessToken: user.accessToken,
        user,
        refreshToken: user.refreshToken,
        isAuthenticated: true,
      });
    } catch (e) {
      console.error(e);
    }
  },
}));
