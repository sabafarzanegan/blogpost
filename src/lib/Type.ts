export type CreateForm = {
  title: string | undefined;
  category: string | undefined;
  desc: string | null;
};

export type post = {
  id: number;
  created_at: Date;
  user: number;
  img: string;
  title: string;
  desc: string | TrustedHTML;
  category: string | undefined;
};

export type formCreatePost = {
  img: string;
  title: string | undefined;
  desc: string | null;
  category: string | undefined;
  user: number | undefined;
};
export type editform = {
  img: string | undefined | null;
  title: string | undefined;
  desc: string | null;
  category: string | undefined;
  user: number | undefined;
};

export type user = {
  id: number | undefined;
  created_at: number | undefined;
  clerkUserId: string;
  username: string;
  email: string;
  img: string;
  role: "admin" | "user";
};

export type comment = {
  content: string;
  created_at: string;
  id: number;
  post: number;
  user: number;
};

export type savepost = {
  created_at: string | undefined;
  id: number | undefined;
  isSave: boolean | undefined;
  post: number | undefined;
  user: number | undefined;
};
