import { create } from "zustand";

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
  accessToken = localStorage.getItem("accessToken") || "";
  refreshToken = localStorage.getItem("refreshToken") || "";
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
      localStorage.clear();
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
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);
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
