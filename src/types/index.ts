export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: keyof Post;
  direction: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  userId?: number;
}

export type ViewMode = "grid" | "table";

export type ThemeMode = "light" | "dark";
