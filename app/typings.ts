import type { ReactNode } from "react";

export interface ErrorProps {
  error: Error;
}
export interface DataProps {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsProps {
  posts: DataProps[];
}

export interface DocumentProps {
  children: ReactNode;
  title?: string;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface PrismaPostsProps {
  title: string;
  body: string;
}
