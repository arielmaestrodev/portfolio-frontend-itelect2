import axiosInstance from "@/lib/axios";
import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().optional(),
  category: z.array(z.string()).optional(),
});

export type BlogInput = z.infer<typeof blogSchema>;

export interface BlogPost extends BlogInput {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const blogService = {
  getAll: async () => {
    const response = await axiosInstance.get("/api/blog/v1/all-posts");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(`/api/blog/v1/post/${id}`);
    return response.data;
  },

  create: async (data: BlogInput & { userId: string }) => {
    const response = await axiosInstance.post("/api/blog/v1/create-post", data);
    return response.data;
  },

  update: async (id: string, userId: string, data: Partial<BlogInput>) => {
    const response = await axiosInstance.post("/api/blog/v1/update-post", {
      id,
      userId,
      ...data,
    });
    return response.data;
  },

  delete: async (id: string, userId: string) => {
    const response = await axiosInstance.post("/api/blog/v1/delete-post", {
      id,
      userId,
    });
    return response.data;
  },
};
