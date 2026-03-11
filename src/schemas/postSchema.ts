import { z } from "zod";
import mongoose from "mongoose";

const objectId = () =>
  z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid ObjectId",
    });

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).optional(),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({
    id: objectId(),
  }),
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).optional(),
  }),
});

export const getPostSchema = z.object({
  params: z.object({
    id: objectId(),
  }),
});

export const deletePostSchema = z.object({
  params: z.object({
    id: objectId(),
  }),
});