import axiosInstance from "@/lib/axios";
import { z } from "zod";

export const knowledgeSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export type KnowledgeInput = z.infer<typeof knowledgeSchema>;

export interface KnowledgeEntry extends KnowledgeInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const knowledgeService = {
  getAll: async () => {
    const response = await axiosInstance.get("/api/knowledgebase/v1/all");
    return response.data;
  },

  create: async (data: KnowledgeInput) => {
    const response = await axiosInstance.post("/api/knowledgebase/v1/create", data);
    return response.data;
  },

  update: async (id: string, data: Partial<KnowledgeInput>) => {
    const response = await axiosInstance.patch(`/api/knowledgebase/v1/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/api/knowledgebase/v1/${id}`);
    return response.data;
  },
};
