import { API_URL } from "@/constants";

export interface ILoginUser {
  user: {
    _id: string;
    email: string;
    fullName: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterUser {
  full_name: string;
  username: string;
  email: string;
  password: string;
  photo?: string;
}

interface errorAuthUser {
  error: string;
  message: string;
  statusCode: number;
}

export interface IGetProfileUser {
  _id: string;
  username: string;
  fullName: string;
  followers: IFollow[];
  following: IFollow[];
  photo: string;
  posts: [];
  emailActivated: boolean;
  reels: [];
}

export interface IFollow {
  username: string;
  _id: string;
}

const getAllUsernames = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/user/usernames`);
  return response.json();
};

export interface IPost {
  _id: string;
  owner: IPostOwner;
  content: string[];
  content_alt: string;
  caption: string;
  private: boolean;
  deleted: boolean;
  published: boolean;
  show_likes: boolean;
  comments_enabled: boolean;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  reels: boolean;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPostOwner {
  _id: string;
  email: string;
  username: string;
  photo: string;
  fullName: string;
}

const getAllPosts = async (): Promise<IPost[]> => {
  const response = await fetch(`${API_URL}/api/post`);
  const posts = await response.json();
  return posts;
};

const checkUser = async () => {
  const response = await fetch(`${API_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.json();
};
const refreshToken = async () => {
  const response = await fetch(`${API_URL}/api/auth/access`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken: localStorage.getItem("refreshToken"),
    }),
  });
  return response.json();
};
const login = async (
  username: string,
  password: string
): Promise<ILoginUser & errorAuthUser> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json() as Promise<ILoginUser & errorAuthUser>;
};
const uploadFile = async (file: File, isList = false) => {
  const formData = new FormData();
  if (!isList) {
    formData.append("files", file);
  } else {
    Object.values(file).map((item) => formData.append("files", item));
  }
  const response = await fetch(`${API_URL}/api/upload/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });
  return response.json();
};
const register = async (values: IRegisterUser) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response.json();
};

const getProfile = async (
  username: string,
  noCache = false
): Promise<IGetProfileUser> => {
  const response = await fetch(`${API_URL}/api/user/profile/${username}`, {
    next: {
      revalidate: noCache ? 2 : 60,
    },
  });
  return response.json();
};

export {
  login,
  register,
  checkUser,
  refreshToken,
  uploadFile,
  getProfile,
  getAllUsernames,
  getAllPosts,
};
