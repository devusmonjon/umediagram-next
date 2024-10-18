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
};
